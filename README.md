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

GitHub Actions runs `.github/workflows/ci.yml` on pull requests and pushes to
`main`. It installs the exact Bun version from `package.json`, builds Next.js,
then runs lint, both TypeScript project checks, and formatting through Turbo.
There are no test scripts in this repository.

The workflow caches Bun downloads and Turbo task results and cancels superseded
runs on the same PR or branch. All tasks use Turbo's default repository inputs,
so source, content, public assets, generated Convex bindings, and configuration
changes invalidate their caches. Build runs before typecheck to generate Next.js
route types. The synthetic Convex URL is only a build fixture; CI does not run a
Convex deployment. Real deployment values remain in Vercel project settings.

Vercel CI is disabled to avoid consuming its CPU allowance. Keep it disabled;
GitHub Actions owns repository checks. The `Quality checks` job can be selected
as a required check wherever branch protection is available.
