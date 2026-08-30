---
tags: [project/portfolio, type/status]
updated: 2026-08-30
---

# Status

Part of [[Overview]].

## Done: daisyUI replaced by shadcn/ui on Base UI (2026-08-30)

The site was shipping **338 KB of CSS (49 KB gzipped)** of which ~288 KB was
daisyUI rules it never used — `.modal`, `.diff`, `.drawer`, `.carousel` and the
rest. Tailwind v4 cannot tree-shake those: they are plain rules inside
`@layer daisyui`, not utilities. Measured daisyUI CSS the site actually matched:
**774 bytes**. It now ships **41 KB / 8 KB gzipped**.

Five stages, each gated on an A/B harness that builds the pre-migration commit
in a worktree, serves both, and compares them in one browser:

1. Token vocabulary — `base-100`→`background`, `base-content`→`foreground`,
   `base-200`→`muted`. Aliased rather than redeclared, so the stage was
   zero-diff by construction.
2. `Button` / `buttonVariants`
3. `Badge` and `linkVariants`
4. Base UI `ToggleGroup` (the `/work` filter) and `Toggle` (theme switch)
5. Plugin removed, shadcn base layer adopted

Two oracles, because neither suffices: a pixel diff catches geometry but is
measurably blind to colour drift below ~1% lightness, and daisyUI's
`:hover` / `:active` / `:focus-visible` were pure `color-mix()` shifts of a few
sRGB steps. So computed styles are compared as exact resolved values too.

Kept: `scripts/ab.sh` and `/kitchen-sink` (a `NEXT_PUBLIC_E2E`-gated specimen
page that 404s in production) as the regression net for future component work.
Run it with `REF=ab-ref scripts/ab.sh`.

Incidental wins: the `/work` filter gained roving arrow-key focus, the
JS-disabled dark theme no longer falls back to a primary that failed AA at
3.4:1, and axe reports zero violations across both themes.

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
