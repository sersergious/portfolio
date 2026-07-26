# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start Next.js dev server
bun run build        # Production build (outputs to .next/)
bun run start        # Serve production build
bun run lint         # ESLint
bun run format       # Prettier (write)
bun run format:check # Prettier (check only)
```

No test suite is configured.

## Architecture

Personal portfolio for Serhii Kuzmin, deployed at `skuzmin.dev`. Built with **Next.js 16** (App Router, SSG), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **DaisyUI v5**. Content lives in **Sanity**, with the Studio embedded at `/studio`.

### Routing

File-based routing via Next.js App Router under `src/app/`:

```
src/app/
  layout.tsx              ← root layout: HTML shell + site-wide metadata/OG
  sitemap.ts              ← /sitemap.xml, built from getAllWork()
  robots.ts               ← /robots.txt (disallows /studio/)
  (site)/
    layout.tsx            ← Navigation + Footer shell, ThemeProvider
    error.tsx             ← segment error boundary (failed Sanity fetch)
    page.tsx              ← / (hero, stack, recent work, press, contact)
    about/page.tsx        ← /about
    not-found.tsx         ← 404
    work/
      page.tsx            ← /work list, all kinds (SSG)
      [slug]/page.tsx     ← /work/:slug detail (SSG via generateStaticParams)
  studio/[[...tool]]/     ← embedded Sanity Studio
```

Root metadata sets a `title.template` of `%s — Serhii Kuzmin`, so page-level
`title` values are bare (`'Work'`, `'About'`, the item title) — don't re-add the
name.

Page metadata is exported via `generateMetadata()`. Data loading is async in Server Components.

`/projects` and `/research` were merged into `/work`; both old paths (list and
`:slug`) 308 to their `/work` equivalents via `redirects()` in `next.config.ts`.
Keep those redirects — the old URLs are indexed.

### Content System

One Sanity document type, `work` ([src/sanity/schemaTypes/work.ts](../src/sanity/schemaTypes/work.ts)), covers both projects and research papers. A required `kind` field (`project` | `research`) is the discriminant:

- **Shared**: `title`, `slug`, `description`, `date`, `tags[]`, `status`, `youtubeUrl`, `image`, `content` (markdown)
- **Project only**: `github`, `demo`
- **Research only**: `abstract`, `authors[]`, `journal`, `conference`, `doi`, `arxiv`, `pdf`

Kind-specific fields use `hidden: onlyFor(kind)` so the Studio form shows only what applies. `status` is one field carrying all seven values; a custom validation rule rejects values that don't match the selected `kind`. `STATUS_BY_KIND` / `statusLabel()` live in [src/lib/work-status.ts](../src/lib/work-status.ts) — dependency-free so both the schema and the site components can import them without pulling Sanity into the site bundle.

The first entry of `tags[]` is treated as the primary language (project) or field (research) and drives the colour dot via `languageColor()`.

Data flow: GROQ queries in [src/sanity/lib/queries.ts](../src/sanity/lib/queries.ts) → [src/lib/sanity-content.ts](../src/lib/sanity-content.ts). Two shapes, matching two fragments:

- `getAllWork(): WorkSummary[]` — the `cardFields` fragment, what a card and the sitemap need. No `content`, `abstract`, `doi`, `arxiv`, `pdf`.
- `getWorkBySlug(): WorkItem | null` — the `detailFields` fragment, `WorkSummary` plus those five.

Keep the split: it's what stops a card from reading a `content` the list query never fetched. `WorkCard`/`WorkList` take `WorkSummary`; `ContentHeader` takes `WorkItem`.

The markdown `content` field is rendered by `react-markdown` in [src/components/mdx/MDXContent.tsx](../src/components/mdx/MDXContent.tsx) (Server Component, despite the `mdx/` directory name — there is no MDX pipeline).

Studio panes (All work / Projects / Research) are defined in [src/sanity/structure.ts](../src/sanity/structure.ts); the filtered panes pre-fill `kind` via initial value templates registered in `schemaTypes/index.ts`.

### Theming

DaisyUI v5 with two built-in themes:

- **Light** → `emerald` (default)
- **Dark** → `dracula` (auto-applied via `prefers-color-scheme: dark`)

Theme switching is handled by `next-themes` (`ThemeProvider` in `(site)/layout.tsx`, `attribute="data-theme"`, `defaultTheme="system"`). It injects its own blocking script, so there is no FOUC and no hand-written inline script — `<html>` carries `suppressHydrationWarning` for the attribute it sets.

### Styling

Tailwind CSS v4 with DaisyUI v5, configured in `src/styles/globals.css` via `@import 'daisyui/daisyui.css'`. PostCSS handled by `@tailwindcss/postcss`. Key semantic classes used throughout: `bg-base-100/200/300`, `text-base-content`, `text-base-content/60`, `border-base-300`, `bg-primary`, `text-primary`, `btn`, `badge`, `card`.

### Client Components

Components that use browser APIs or React hooks need `'use client'`. Everything else is a Server Component — keep it that way:

- `src/components/layout/Navigation.tsx` — `usePathname`
- `src/components/theme/theme-toggle.tsx`, `theme-provider.tsx` — localStorage, `data-theme`
- `src/components/work/WorkList.tsx` — kind filter buttons (`useState`)
- `src/app/(site)/error.tsx` — error boundaries must be Client Components
- `src/components/ui/ProtectedMailLink.tsx` — decodes the address on click

### Component Organization

```
src/components/
  about/    ← About page sections
  content/  ← ContentHeader (detail hero + abstract)
  home/     ← home-page pieces
  icons/    ← brand SVGs (GitHub, LinkedIn)
  layout/   ← Navigation and Footer
  mdx/      ← MDXContent renderer (react-markdown, Server Component)
  theme/    ← ThemeToggle / ThemeProvider (DaisyUI data-theme)
  ui/       ← PageHeader, SectionLabel, ProtectedMailLink
  work/     ← WorkCard (kind-driven) and WorkList (filter buttons)
```

`PageHeader` is the masthead for `/work` and `/about` — h1 at the same scale as
a detail page, optional lead, optional children (the filter row), and the home
page's graph-paper backdrop.

`WorkCard` renders both kinds — icon, subtitle line, and meta links branch on `item.kind`. Don't add a second card component; extend this one.

## Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — required; `src/sanity/env.ts` throws without them
- `NEXT_PUBLIC_SANITY_API_VERSION` — optional, defaults to `2026-06-04`
- `NEXT_PUBLIC_SITE_URL` — optional, defaults to `https://skuzmin.dev`; drives `metadataBase`, the sitemap, and robots.txt via [src/lib/site.ts](../src/lib/site.ts)

Sanity CLI work (migrations, dataset export) authenticates through `npx sanity login`, not a token in `.env`.

## Sanity Migrations

Schema changes that touch existing documents go in `migrations/<id>/index.ts` and run through the CLI (`npx sanity login` first — the CLI session is the auth, no token in `.env`):

```bash
npx sanity dataset export production ./backup.tar.gz   # always first
npx sanity migrations list
npx sanity migrations run <id>                # dry run (default)
npx sanity migrations run <id> --no-dry-run   # writes
```

Sanity cannot patch `_type`, so a type rename is create-new-then-delete-old as two separate migrations, verified in between.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
