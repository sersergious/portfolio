---
tags: [project/portfolio, type/reference]
---

# Content System

Part of [[Overview]]. See [[Architecture]] for how content routes into pages.

Content is **markdown files in the repo** at `content/work/`. There is no CMS and
no external service — the build reads the filesystem, so it needs no network and
no environment variables.

**The filename is the slug.** `content/work/surface-evolver.md` serves
`/work/surface-evolver`.

## File shape

YAML frontmatter plus the markdown body:

```markdown
---
kind: project
title: Surface Evolver
description: A Surface Evolver desktop application for Windows, Mac and Linux.
date: '2026-07-25'
status: completed
tags:
  - full-stack
  - C
  - Three.js
youtubeUrl: 'https://youtu.be/FiEzFyP_tAg'
github: 'https://github.com/sersergious/surface-evolver'
demo: 'https://surface-evolver.vercel.app/'
---

# About

Body markdown, rendered by react-markdown.
```

### Fields

A required `kind` (`project` | `research`) is the discriminant.

- **Shared**: `title`, `description`, `date`, `status`, `tags[]`, `youtubeUrl`
- **Project only**: `github`, `demo`
- **Research only**: `abstract`, `authors[]`, `journal`, `conference`, `doi`,
  `arxiv`, `pdf`

`status` carries all seven values (`completed` / `in-progress` / `archived` /
`published` / `preprint` / `in-review` / `draft`). The legal sets per kind live
in `src/lib/work-status.ts`, shared with the card's status label.

The first entry of `tags[]` is the primary language (project) or field
(research) — it drives the colour dot via `languageColor()`.

**Quote the `date`.** Unquoted, YAML parses it to a `Date` and the local offset
can shift it a day. `toDate()` in the loader normalises that case defensively,
but quoting is the intent.

Prose fields (`description`, `abstract`) render as a single paragraph, so they
are written unwrapped on one logical line rather than hard-wrapped.

## Reading it

`src/lib/work-content.ts` is the whole data layer:

- `getAllWork(): WorkSummary[]` — every file, newest first
- `getWorkBySlug(slug): WorkItem | null` — one file, including the body
- `getAllWorkSlugs(): string[]` — drives `generateStaticParams`

`WorkSummary` is what a card needs; `WorkItem` extends it with `content`,
`abstract`, `doi`, `arxiv`, `pdf`. Keep the split — it is what stops a card from
reading a body the list never loaded.

Nothing validates frontmatter at build time. `toStatus()` falls back when a
`status` is missing or illegal for its kind, which is the one guarantee the old
Sanity schema used to enforce.

The body is rendered by `react-markdown` in
`src/components/mdx/MDXContent.tsx` — a Server Component. The `mdx/` directory
name is historical; there is no MDX pipeline.

## Adding a work item

Create `content/work/<slug>.md` with the frontmatter above and commit it. That
is the entire workflow — the deploy picks it up, and the change is reviewable in
a PR like any other.

## History

Until 2026-08-04 this content lived in **Sanity**, with an embedded Studio at
`/studio`. It was moved into the repo: three documents totalling ~6 KB did not
justify ~36 MB of dependencies, a hosted service in the build path, and two
required environment variables.

Before that, `project` and `researchPaper` were separate document types; they
were merged into one `work` type with a `kind` discriminant. The Sanity
migration scripts that performed that merge were removed along with Sanity —
they are in git history at commit `ecd82c4` if ever needed.
