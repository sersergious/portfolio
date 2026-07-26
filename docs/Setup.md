---
tags: [project/portfolio, type/setup]
---

# Commands

Part of [[Overview]].

```bash
bun run dev          # Start Next.js dev server
bun run build         # Production build (outputs to .next/)
bun run start         # Serve production build
bun run lint           # ESLint
bun run format         # Prettier (write)
bun run format:check    # Prettier (check only)
```

No test suite is configured.

## Environment Variables

Both are required — `src/sanity/env.ts` throws without them.

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` — optional, defaults to `2026-06-04`

Sanity CLI work (migrations, dataset export) authenticates through `npx sanity
login`, not through a token in `.env`.
