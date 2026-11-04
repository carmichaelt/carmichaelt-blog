# Carmichaelt.

A personal markdown blog. Posts, pages, and projects live in `content/` and ship with the code.

The homepage T is a WebGPU rim-light shader adapted from [vgpu Next.js Flare](https://vgpu.sh/examples/nextjs-flare).

## Stack

- Next.js 16 App Router
- Markdown via `gray-matter` and `react-markdown`
- [vgpu](https://vgpu.sh) for the homepage shader
- Tailwind CSS 4
- Vercel

## Content

```
content/
├── posts/      # blog posts and poems
├── pages/      # long-lived pages
└── projects/   # project notes
```

Each file is markdown with YAML frontmatter. Add a post by creating `content/posts/your-slug.md`.

## Develop

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tooling and CI

Bun is pinned to npm version `1.4.4-canary.20261104.1`, revision `b9f2ec363`,
for its built-in linter and formatter. After `bun install --frozen-lockfile`,
package scripts use the trusted, exact-version local Bun dependency. Run checks
with `bun run ci:check`, or individually:

```bash
bun run lint
bun run typecheck
bun run format:check
bun run build
```

`bun run lint:fix` and `bun run format` apply fixes. Keep `--no-script` in the
lint scripts to select Bun's built-in command. Stable Bun 1.4.4 has no built-in
linter and can recurse through a script named `lint`, even with that flag.
The `.oxlintrc.json` and `.oxfmtrc.json` files still configure Bun, including
type-aware linting and the existing generated-file exclusions.

`turbo.json` tags lint, both TypeScript project checks, formatting, and the
non-deploying Next.js build for Vercel CI. There are no test scripts or GitHub
Actions workflows in this repo. All tasks use Turbo's default repository inputs,
so source, content, public assets, generated Convex bindings, and configuration
changes invalidate their caches. Build output is cached separately from the
Next.js incremental cache. The build gets 4 CPUs / 8 GB; other checks use the
2 CPU / 4 GB defaults.

The root `vercel.json` configures CI installation and a synthetic Convex URL for
the build check. It does not run a Convex deployment. The build also works without
a Convex URL, in which case reactions are disabled. Real deployment environment
values remain in Vercel project settings.

Vercel accepted `vercel ci enable --remote origin --non-interactive --json` on
November 4, 2026, but this GitHub repository is public. The current
[Vercel CI limitations](https://vercel.com/docs/ci#limitations) exclude public
repositories. Enabling CI alone therefore does not establish that checks run;
confirm an actual Vercel CI run before requiring its status check. Repository
visibility and billing must remain unchanged.
