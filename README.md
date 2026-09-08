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
