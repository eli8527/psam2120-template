import { spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const template = 'https://github.com/eli8527/psam2120-template'

function read(command, args) {
  const result = spawnSync(command, args, {
    cwd: root, encoding: 'utf8', timeout: 5000, windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  return result.status === 0 ? result.stdout.trim() : null
}

const npm = process.env.npm_execpath
  ? read(process.execPath, [process.env.npm_execpath, '--version'])
  : null
const git = read('git', ['--version'])
const remote = read('git', ['remote', 'get-url', 'origin'])
const match = /^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([a-z\d-]+)\/([a-z\d._-]+?)\/?$/i.exec(remote ?? '')
const owner = match?.[1]
const repo = match?.[2].replace(/\.git$/, '')
const repository = owner && repo ? `https://github.com/${owner}/${repo}` : null
const pages = repository
  ? `https://${owner.toLowerCase()}.github.io/${repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '' : `${repo}/`}`
  : 'https://YOUR-USERNAME.github.io/YOUR-REPO/'
const [major, minor] = process.versions.node.split('.').map(Number)
const supported = (major === 22 && minor >= 12) || major >= 24

const steps = [
  ['Welcome to CD Studio', 'This guide only reads local information. Use a second terminal for commands. It never installs, commits, pushes, changes settings, or asks for passwords. Ctrl+C exits.'],
  ['Check your tools', `Node ${process.version}${supported ? '' : ' — install Node 24 LTS'}; npm ${npm ?? 'not detected; run this guide with npm run setup'}; ${git ?? 'Git not found'}.\nInstall: https://nodejs.org/en/download and https://git-scm.com/downloads`],
  ['Sign into GitHub', 'Create or sign into your account in your browser: https://github.com'],
  ['Create your repository', `Open ${template} → Use this template → Create a new repository. Choose your account and Public.\n${repository ? `Current copy: ${repository}` : 'Your own repository should be a separate copy of the template.'}`],
  ['Clone your copy', 'On YOUR repository, select Code → HTTPS and copy its URL. In a terminal, run git clone followed by that URL, then cd into the new folder. Skip this if already cloned.'],
  ['Open in VS Code', 'Choose File → Open Folder and select your clone. Open Terminal → New Terminal. Install VS Code: https://code.visualstudio.com/download'],
  ['Run locally', 'Run npm install, then npm run dev. Open the localhost URL Vite prints. The page is intentionally blank. localhost is a preview on your computer.'],
  ['Enable GitHub Pages', `${repository ?? 'Your GitHub repository'} → Settings → Pages → Build and deployment → Source → GitHub Actions.`],
  ['Commit and push', `Run npm run lint and npm run build. Review git status and git diff. Stage your intended changes with git add, then git commit -m "Describe your change" and git push origin main.\n${read('git', ['config', '--get', 'user.name']) && read('git', ['config', '--get', 'user.email']) ? 'Git author details are configured.' : 'If Git asks for your identity, set git config user.name "Your Name" and git config user.email "Your GitHub no-reply email". Find it at https://github.com/settings/emails'}`],
  ['Check deployment', `Open ${repository ? `${repository}/actions` : 'your repository’s Actions tab'}. Check that Deploy to GitHub Pages succeeds. If the initial run failed before enabling Pages, rerun it. Manual trigger: Run workflow → main.`],
  ['Find your website', `Expected default URL: ${pages}\nSettings → Pages shows the actual published URL. The GitHub code page is a different URL.`],
  ['Verify it yourself', 'Check the latest Actions run succeeded, then open the published URL and refresh. This infrastructure-only template displays a blank page. Once you build your app, test its content, assets, interactions, and mobile layout too. This guide does not verify deployment.'],
]

const rl = createInterface({ input: process.stdin, output: process.stdout })
const answers = rl[Symbol.asyncIterator]()
rl.on('SIGINT', () => rl.close())

try {
  steps: for (const [index, [title, instructions]] of steps.entries()) {
    console.log(`\n${index + 1}/${steps.length} — ${title}\n${instructions}`)
    while (true) {
      process.stdout.write('Ready to continue? [y/N] ')
      const answer = await answers.next()
      if (answer.done || /^(?:n|no)?$/i.test(answer.value.trim())) {
        console.log('\nPaused. No files changed. Rerun npm run setup when ready.')
        break steps
      }
      if (/^(?:y|yes)$/i.test(answer.value.trim())) break
      console.log('Enter y or n, then press Enter.')
    }
  }
} finally {
  rl.close()
}
