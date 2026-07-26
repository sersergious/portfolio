---
tags: [project/portfolio, type/status]
updated: 2026-07-25
---

# Status

Part of [[Overview]].

## Done: projects + research merged (2026-07-25)

One Sanity `work` type with a `kind` discriminant replaced `project` and
`researchPaper`; one `/work` route with filter tabs replaced `/projects` and
`/research` (old paths 308 across). Both migrations in `migrations/` have run —
3 documents moved, no legacy documents remain, the old schema files are deleted.
All three slugs prerender.

### Content follow-ups in the Studio

- The research paper has **no `status`** — the pre-merge document never set one,
  so the migration had nothing to copy. `status` is required now, so the Studio
  flags it, and the site falls back to `Draft`. Set it.
- The research paper's `description` is its **full abstract** — the migration
  seeded it that way because research had no short summary field. Trim it to a
  sentence or two; it feeds `<meta name="description">` and the related-work
  list.

## Recent Work (from git log)

- Dependency updates (latest commit)
- Resume updated
- Portfolio link fixed in README
- Removed unused katex/highlight.js CSS imports
- Minor UI enhancements
- Major redesign merged (`feature/new-ui`) — this superseded the old `main`
- Sanity integration added alongside the redesign
- New homepage

## Working Tree (uncommitted)

- `bun.lock`, `package.json` modified (dependency bump, matches latest commit's intent — verify it's committed/pushed)
- Untracked: `.claude/settings.local.json`

## Cleanup Candidates

- `RESEND_API_KEY` is gone from `.env` and unreferenced — done.
