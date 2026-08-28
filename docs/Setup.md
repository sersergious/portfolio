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

One, optional:

- `NEXT_PUBLIC_SITE_URL` — defaults to `https://skuzmin.dev`. Drives
  `metadataBase`, canonicals, the sitemap, robots.txt, and the OG card.

Content is read from `content/work/` on disk, so the build needs **no
credentials and no network**. A clean clone builds with an empty environment.
