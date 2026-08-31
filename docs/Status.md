---
tags: [project/portfolio, type/status]
updated: 2026-08-31
---

# Status

Part of [[Overview]].

## Done: redesign — the sheet, one hue axis, a real mono (2026-08-31)

The migration's contract was that nothing changed appearance, so the site
came out of it looking like a daisyUI theme wearing shadcn's mechanics. This
fixes what that inheritance got wrong and commits to the drafting concept
the site already had.

**Foundation.** JetBrains Mono, latin subset, one weight, 20.7KB, local so
the build still needs no network — the mono labels are the concept's voice
and `ui-monospace` made them look like three different sites depending on
the visitor's OS. One hue axis at 245deg for neutrals and accent alike; the
light neutral used to be violet-cast at hue 286, fighting the blue accent
41deg away. Tones became named roles solved against contrast targets rather
than opacity steps. The background/muted step went from 1.06:1 — literally
indistinguishable — to 1.12 / 1.18. Hover mixes toward the foreground, so a
dark primary button no longer _loses_ contrast when you point at it.

**Signature.** The grid is ruled down the whole document at a 2rem module
and the structural rhythm rides it. A title block spans the bottom of the
hero the way a drawing's does — Degree, Institution, Location, Status — in
place of two scattered mono lines. The sheet rules itself in once on load,
600ms, behind prefers-reduced-motion, animating only the drawing so nothing
gates content paint: LCP 44ms, CLS 0.0.

**Two fixes from looking at the page.** The grid was briefly drawn twice,
with origins that could not align. And the section dividers sat in the same
visual register as the grid lines — both 1px, 1.26:1 apart — so every
divider read as stray paper. Separation is now 1.57x light / 2.46x dark.

Harness: `REF=design-ref scripts/ab.sh` gates future work against this.

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
