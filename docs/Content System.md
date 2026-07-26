---
tags: [project/portfolio, type/reference]
---

# Content System

Part of [[Overview]]. See [[Architecture]] for how content routes into pages.

Content lives in **Sanity**, not in the repo. The Studio is embedded at `/studio`
(`src/app/studio/[[...tool]]/page.tsx`), configured by `sanity.config.ts`.

## The `work` schema

One document type covers both projects and research papers:
`src/sanity/schemaTypes/work.ts`. A required `kind` field (`project` |
`research`) is the discriminant.

- **Shared**: `title`, `slug`, `description`, `date`, `tags[]`, `status`,
  `youtubeUrl`, `image`, `content` (markdown)
- **Project only**: `github`, `demo`
- **Research only**: `abstract`, `authors[]`, `journal`, `conference`, `doi`,
  `arxiv`, `pdf`

Kind-specific fields are hidden in the Studio when they don't apply. `status` is
a single field holding all seven values (`completed` / `in-progress` /
`archived` / `published` / `preprint` / `in-review` / `draft`); a custom
validation rule rejects a value that doesn't match the chosen `kind`. The
allowed sets and display labels live in `src/lib/work-status.ts`, which is
dependency-free so both the schema and the site components can import it.

The first entry of `tags[]` is the primary language (project) or field
(research) — it drives the colour dot via `languageColor()`.

`image` exists for the Studio thumbnail only; nothing on the site renders it.

## Reading it

GROQ queries live in `src/sanity/lib/queries.ts` (`ALL_WORK_QUERY`,
`WORK_BY_SLUG_QUERY`, `ALL_WORK_SLUGS_QUERY`). `src/lib/sanity-content.ts` maps
raw documents to the `WorkItem` interface and exposes `getAllWork()` and
`getWorkBySlug()`.

The markdown `content` field is rendered by `react-markdown` in
`src/components/mdx/MDXContent.tsx` (a Server Component; the `mdx/` directory
name is historical — there is no MDX pipeline).

## Migrations

Schema changes that touch existing documents go in `migrations/<id>/index.ts`
and run through the CLI. `npx sanity login` first — the CLI session is the auth,
there is no write token in `.env`.

```bash
npx sanity dataset export production ./backup.tar.gz   # always first
npx sanity migrations run <id>                # dry run (the default)
npx sanity migrations run <id> --no-dry-run   # writes
```

Sanity cannot patch `_type`, so a type rename is create-new-then-delete-old,
split into two migrations with verification in between.

## History

Until 2026-07-25 this was two document types, `project` and `researchPaper`,
behind two route trees. See [[Status]].
