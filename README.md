# PSAM 2120 infrastructure

React, Vite, TypeScript, Tailwind CSS v4, npm, and automatic GitHub Pages deployment. No application, components, styles, images, or demo content are included. `index.html` is an empty entry document so Vite can run and build.

## Start

1. Install [Node.js 24 LTS](https://nodejs.org/en/download), [Git](https://git-scm.com/downloads), and [VS Code](https://code.visualstudio.com/download).
2. Sign into GitHub. Open [the template](https://github.com/eli8527/psam2120-template), choose **Use this template → Create a new repository**, and create your own public copy.
3. On your copy, select **Code → HTTPS**, copy the URL, and run `git clone` followed by that URL. Open the cloned folder in VS Code.
4. Open **Terminal → New Terminal** and run:

```sh
npm run setup
npm install
npm run dev
```

Open the localhost URL printed in the terminal. It will be blank. **Localhost** means this computer; the terminal must stay running. Stop it with Ctrl+C.

`npm run setup` is an optional, repeatable walkthrough. It only reads local tools, Git settings, and the repository remote. It does not change settings, install tools, push code, or verify a deployment. On Windows, use a Command Prompt terminal or `npm.cmd` if PowerShell blocks `npm.ps1`.

## Build your application

Create your own files under `src/` when ready. React and React DOM are installed; Vite's React and Tailwind plugins are configured. Add your module entry to `index.html` and import a stylesheet containing `@import "tailwindcss";` when you start styling. There is no rendering code to replace.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Check TypeScript and build `dist/` |
| `npm run preview` | Preview the last build locally |
| `npm run lint` | Check code quality |
| `npm run setup` | Guided setup and deployment instructions |

## Save and publish

**Git** tracks changes. A **commit** saves a named snapshot locally. A **push** sends commits to GitHub. A **build** produces browser-ready files; a **deployment** publishes those files.

Run lint and build, then review `git status` and `git diff`. Stage only your intended files with `git add`, then:

```sh
git commit -m "Describe your change"
git push origin main
```

If Git asks for your identity, set `git config user.name "Your Name"` and `git config user.email "Your GitHub no-reply email"`. Find the email in [GitHub settings](https://github.com/settings/emails). Use the editor's browser sign-in for authentication.

In **your repository → Settings → Pages → Build and deployment → Source**, select **GitHub Actions** once. Pushes to `main` deploy automatically. You can also run **Actions → Deploy to GitHub Pages → Run workflow**. Wait for the workflow to succeed and open the link in **Settings → Pages**. If the initial run failed before enabling Pages, rerun it.

The default URL is `https://USERNAME.github.io/REPOSITORY/`, or `https://USERNAME.github.io/` for an owner-matching `USERNAME.github.io` repository. The workflow uses GitHub Pages metadata to set Vite's base automatically; local development stays at `/`. No extra tokens or secrets are needed.

When adding images, prefer Vite imports. Public files should use `import.meta.env.BASE_URL` in code or `%BASE_URL%` in HTML. Use in-page anchors or hash navigation; history routing can fail on Pages refresh. See [Vite's deployment guide](https://vite.dev/guide/static-deploy.html).

## Figma and AI agents

Install the official [Codex](https://developers.openai.com/codex/ide/) or [Claude Code](https://code.claude.com/docs/en/vs-code) VS Code extension. Read and critique generated code; ask the agent to explain anything unclear.

For Codex, add a Streamable HTTP MCP server named `figma` at `https://mcp.figma.com/mcp` in the extension's MCP settings, then authenticate. See [OpenAI's MCP guide](https://developers.openai.com/codex/mcp/).

For Claude Code, use Figma's official plugin or, with the standalone CLI installed, run `claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp`, start a new session, and authenticate through `/mcp`. Follow [Figma's official client setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) for current instructions and account requirements.

Start with one frame: inspect components and tokens, identify missing interactions and mobile behavior, agree on a plan, implement, run locally, compare with Figma, iterate, then deploy. Visual fidelity, working functionality, and readable accessible code are separate checks.

## Modern Web Guidance

Google Chrome's [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) skill is included in `.agents/skills/modern-web-guidance/`. Codex can discover it as a project skill; `CLAUDE.md` imports the same file for Claude Code. It searches for web platform guidance on demand, with **Baseline Widely available** as the browser support target. No application dependency is added.

The skill is copied unchanged from [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance/tree/65e7edd67e77420eaf02c5df00fdc0521417d809/skills/modern-web-guidance), with its Apache 2.0 license alongside it. It will be available to agents on their next turn.

## Troubleshooting

- Missing `npm` or `git`: install the tool and restart VS Code. Use Node 24 LTS.
- Missing `package.json`: open a terminal inside the cloned folder.
- `npm ci` fails: run `npm install`, review, and commit both package files.
- No workflow run: check the workflow is on `main` and Actions is enabled.
- Deployment failure: read the first failed Actions step; confirm Pages uses GitHub Actions and account/organization policy allows it.
- A blank page is expected until you create your application. After that, inspect the browser console for errors or missing asset paths.
- Never commit dependencies, `dist/`, passwords, tokens, or `.env` files. Browser code and `VITE_` variables are public.

Infrastructure lives in `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `package.json`, and `.github/workflows/deploy.yml`. The only script is `scripts/setup.mjs`. Instructor notes are in [INSTRUCTOR.md](INSTRUCTOR.md).
