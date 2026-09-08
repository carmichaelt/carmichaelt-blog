---
title: Tech Stack
description: The default kit I ship with, and the few places a product needs something else.
---

Most of the work is the same shape: a Next.js app, live data, auth, an AI surface, and a Vercel deploy. I keep that kit small on purpose. Complexity only earns its place when the product needs it.

## The default

- **App** — [Next.js](https://nextjs.org) App Router, [React](https://react.dev), [TypeScript](https://www.typescriptlang.org), [Tailwind CSS](https://tailwindcss.com)
- **Data** — [Convex](https://convex.dev) when the product is live and collaborative
- **Auth** — [Clerk](https://clerk.com)
- **AI** — [Vercel AI SDK](https://ai-sdk.dev) over OpenAI
- **Ship** — [Bun](https://bun.sh), [Vercel](https://vercel.com), [Git](https://git-scm.com), [Cursor](https://cursor.com)

Trip Timelines, What To Get Me, ScratchLists, and SkyDunes all sit on that pattern. This site is the exception that proves it: markdown in git, no backend.

## Where it changes

- **Postgres and Prisma** on Local Community Hub, where communities, imports, and admin tools want a relational schema.
- **WorkOS** on ExplainBack, because learners, guardians, and organisations are not a single Clerk user.
- **Polar** for ExplainBack billing; **Stripe** for Local Community Hub credits and setup fees.
- **Expo** when there is a phone app — What To Get Me and ScratchLists.
- **vgpu** and WebGPU for the T on this homepage. Fancy lighting is not a product requirement everywhere.

I would rather repeat a boring stack than invent a new one for each idea.
