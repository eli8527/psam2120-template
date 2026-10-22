# Instructor notes

This is infrastructure only. The initial site is deliberately blank, with no app code or visual design.

## Publish and distribute

1. Review the files, then run `npm ci`, `npm run lint`, and `npm run build`.
2. Commit and push to `main` in [eli8527/psam2120-template](https://github.com/eli8527/psam2120-template).
3. In **Settings → General**, enable **Template repository**.
4. In **Settings → Pages**, select **GitHub Actions** as the source. Run or rerun the included workflow and verify the published URL.
5. Share the repository link with your 15–20 students. Each student uses **Use this template**, clones their own copy, and enables Pages independently. Collect both their repository and public site URLs.

## Before class

- Test a fresh template copy under a different repository name, including its actual deployment.
- Confirm Node 24 LTS, Git, VS Code, GitHub access, and the selected AI agent are available.
- Check students can access their Figma files and authenticate the MCP connection.
- Test onboarding on macOS and Windows. Run `npm run setup`; it never changes files or publishes anything.
- Confirm classroom network and organization policies permit npm, GitHub Actions, and Pages.

## Keep it small

Keep the empty HTML entry. Students add their own React entry and stylesheet when implementing their designs.

Update TypeScript and `typescript-eslint` together so their supported versions stay compatible. Commit the lockfile.

For problems, identify the failed stage: installation, local server, Git push, Actions build, or Pages deployment. Check the exact error and README troubleshooting. A local build does not prove public deployment. Template updates do not automatically update existing student copies.
