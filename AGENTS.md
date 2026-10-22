# Project conventions

- Keep this template infrastructure-only. Do not add UI, demo content, components, styles, or images unless explicitly requested.
- Inspect existing files before editing. Explain substantial plans and assumptions in plain language.
- When asked to build an application, use small React components, TypeScript, and Tailwind v4. Preserve accessibility and responsive behavior.
- Identify missing design and interaction requirements. A Figma frame does not specify all behavior.
- Avoid unnecessary dependencies, abstractions, backend services, and authentication frameworks.
- Preserve static GitHub Pages hosting and the workflow's automatic repository base path. Prefer imported assets or Vite's base prefix and use refresh-safe navigation.
- Run `npm run lint` and `npm run build`. Explain changes, checks, and limitations honestly.
- Keep the lockfile consistent. Never commit dependencies, build output, credentials, or environment files.
- Help students inspect, understand, and critique generated code.
