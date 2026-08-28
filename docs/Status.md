---
tags: [project/portfolio, type/status]
updated: 2026-07-25
---

# Status

Part of [[Overview]].

## Done: content moved out of Sanity (2026-08-04)

Content is now markdown in `content/work/` read by
`src/lib/work-content.ts`. Sanity is gone entirely — `src/sanity/`, the `/studio`
route, `sanity.config.ts`, `sanity.cli.ts`, and five dependencies
(`sanity`, `next-sanity`, `@sanity/vision`, `@sanity/icons`,
`styled-components`), about 36 MB of `node_modules`.

The build now needs no credentials and no network. `NEXT_PUBLIC_SANITY_*` can be
removed from Vercel.

Both content follow-ups from the merge are resolved: the research paper's
`status` is `published`, and its `description` is a two-sentence summary rather
than the full abstract (the abstract is still there in its own field).

The Sanity migration scripts that merged `project` + `researchPaper` into one
`work` type are in git history at `ecd82c4`.

## Done: projects + research merged (2026-07-25)

One `work` shape with a `kind` discriminant replaced `project` and
`researchPaper`; one `/work` route with filter buttons replaced `/projects` and
`/research` (old paths 308 across). All three slugs prerender.

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
