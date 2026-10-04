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

Personal portfolio for Serhii Kuzmin, deployed at `skuzmin.dev`. Built with **Next.js 16** (App Router, SSG), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui on Base UI**. Content is markdown in `content/work/` — no CMS, no external service, no build-time network.

### Routing

File-based routing via Next.js App Router under `src/app/`:

```
src/app/
  layout.tsx              ← root layout: HTML shell + site-wide metadata/OG
  sitemap.ts              ← /sitemap.xml, built from getAllWork()
  robots.ts               ← /robots.txt
  opengraph-image.tsx     ← generated 1200x630 social card
  (site)/
    layout.tsx            ← Navigation + Footer shell, ThemeProvider
    error.tsx             ← segment error boundary
    page.tsx              ← / (hero, stack, recent work, press, contact)
    about/page.tsx        ← /about
    not-found.tsx         ← 404
    work/
      page.tsx            ← /work list, all kinds (SSG)
      [slug]/page.tsx     ← /work/:slug detail (SSG via generateStaticParams)
```

Root metadata sets a `title.template` of `%s — Serhii Kuzmin`, so page-level
`title` values are bare (`'Work'`, `'About'`, the item title) — don't re-add the
name.

Page metadata is exported via `generateMetadata()`. Data loading is async in Server Components.

`/projects` and `/research` were merged into `/work`; both old paths (list and
`:slug`) 308 to their `/work` equivalents via `redirects()` in `next.config.ts`.
Keep those redirects — the old URLs are indexed.

### Content System

Content is **markdown files in `content/work/`** — no CMS, no external service, no env vars. **The filename is the slug.** A required `kind` field (`project` | `research`) in the frontmatter is the discriminant:

- **Shared**: `title`, `description`, `date`, `status`, `tags[]`, `youtubeUrl`
- **Project by convention**: `github`, `demo`
- **Research by convention**: `abstract`, `authors[]`, `journal`, `conference`, `doi`, `arxiv`, `pdf`

**`kind` gates almost nothing.** It selects the card icon, feeds the `/work`
filter, and decides whether a card and detail header lead with `authors[]` or
with `description` — that is the whole list. Every field above is parsed by
`toSummary()`/`getWorkBySlug()` and rendered by `WorkCard`/`ContentHeader` for
*either* kind. So a research item can carry a `github` — the VQE entry links its
companion web app that way — and a project could carry a `pdf`. Treat the split
above as editorial convention, not a schema.

`status` carries all seven values; `STATUS_BY_KIND` / `statusLabel()` live in [src/lib/work-status.ts](../src/lib/work-status.ts). Nothing validates frontmatter at build time — `toStatus()` falls back when a status is missing or illegal for its kind, which is the only guarantee the old Sanity schema enforced.

**Quote the `date`** in frontmatter. Unquoted, YAML parses it to a `Date` and the local offset can shift it a day; `toDate()` normalises that defensively, but quoting is the intent. Prose fields (`description`, `abstract`) render as one paragraph, so keep them unwrapped on a single logical line.

The first entry of `tags[]` is treated as the primary language (project) or field (research) and drives the colour dot via `languageColor()`.

Data flow: [src/lib/work-content.ts](../src/lib/work-content.ts) reads and parses the files with `gray-matter`. Two shapes:

- `getAllWork(): WorkSummary[]` — every file, newest first. No `content`, `abstract`, `doi`, `arxiv`, `pdf`.
- `getWorkBySlug(): WorkItem | null` — `WorkSummary` plus those five.
- `getAllWorkSlugs(): string[]` — drives `generateStaticParams`.

Keep the split: it's what stops a card from reading a `content` the list never loaded. `WorkCard`/`WorkList` take `WorkSummary`; `ContentHeader` takes `WorkItem`.

The markdown body is rendered by `react-markdown` in [src/components/mdx/MDXContent.tsx](../src/components/mdx/MDXContent.tsx) (Server Component, despite the `mdx/` directory name — there is no MDX pipeline).

**To add a work item:** create `content/work/<slug>.md` and commit it. That's the whole workflow.

### Theming

Two themes defined as CSS custom properties in `src/styles/globals.css`, in
shadcn's two-tier shape: real properties on `:root`, each a
`light-dark(light, dark)` pair, aliased into
Tailwind's namespace by `@theme inline`. Both tiers are needed — `@theme inline`
does not emit its variables to the document, it only inlines them into
utilities, so components reaching a token from an arbitrary value
(`color-mix(in oklab, var(--muted), #000 7%)`) need the `:root` tier.

The dark `primary` is a hand-solved value, not a pick: the most saturated
in-gamut chroma at the lightness holding primary-as-text at 5.6:1 on the
background. The light half is solved the same way at 6.5:1.

The sheet is one grid on `body::before`, ruled at `--module` (2rem) across the
whole document. Structural rhythm — section padding, nav height, the rule under
a section label — is a multiple of that module; intra-section spacing is
typographic and deliberately is not. Do not add a second grid: two with
different origins cannot align.

`color-scheme` is the theme switch: `:root` is `light dark` (system decides),
and `.light` / `.dark` pin it. It also stops the browser painting scrollbars,
form controls and the canvas in the wrong mode. Tailwind's Lightning CSS
compiles `light-dark()` to a `--lightningcss-light/dark` variable toggle, so
it works in browsers without native support.

Theme switching is `next-themes` (`ThemeProvider` in `(site)/layout.tsx`,
`attribute="class"`, `defaultTheme="system"`). It injects its own blocking
script, so there is no FOUC — `<html>` carries `suppressHydrationWarning` for
the class it sets. With JS off there is no class, and `color-scheme: light
dark` falls back to the system preference.

### Styling

Tailwind CSS v4, no component framework and no CSS imports beyond Tailwind
itself. PostCSS via `@tailwindcss/postcss`. Base UI's state styling uses
Tailwind's own bare `data-*` variants (`group-data-pressed:`), so the `shadcn`
package is a CLI run through `bunx` and not a dependency.

Tokens: `background`, `foreground`, `muted-foreground` (secondary prose),
`subtle-foreground` (card descriptions, meta rows), `muted` (surfaces),
`primary` / `primary-foreground`, `border`, `ring`.

Text tone is a named role, never an opacity step. Every value is solved
against a contrast target on **both** grounds it can appear on — `subtle-
foreground` is 52% and not 55% because 55% measured 4.12:1 on `muted`.
Measured, light / dark: foreground 16.94 / 14.45, muted-foreground 7.39 /
8.25, subtle-foreground 5.27 / 5.64. Opacity survives only for a disabled
state and two decorative marks, which is what it is honestly for.

Hover and active mix toward `--foreground`, never toward black: one
expression for both themes, and contrast always increases. Mixing black is
right in light and backwards in dark.

`--border` and the sheet's grid line must stay in different visual registers.
They were both 1px and 1.26:1 apart once, and every section divider read as a
stray grid line. Separation is now 1.57x light / 2.46x dark — darken one and
you must re-check the other.

Components live in `src/components/ui/` as cva variants:

- `button.tsx` — `buttonVariants` (`default` | `primary` | `ghost`; `sm` |
  `md` | `icon-sm`). No component: apply `buttonVariants()` directly to
  `<button>`, `<a>` or `<Link>`. `md` is for the hero's two real actions
  only — the rest of the site is deliberately dense at `sm`.
- `badge.tsx` — `Badge` / `badgeVariants` (`ghost` | `soft`)
- `link-variants.ts` — `linkVariants` (`underline: always | hover`,
  `tone: default | primary`), a cva function rather than a component because
  the call sites are `<a>`, `next/link`, and markdown-rendered anchors
- `toggle.tsx` — `ToggleGroupItem` over Base UI's `Toggle`, for the `/work`
  filter

**daisyUI was removed on 2026-08-30.** It shipped ~288 KB of CSS for the 774
bytes the site used, because Tailwind v4 cannot tree-shake plain rules in
`@layer`. The migration notes are in git history (`docs/Status.md` before
the `docs/` removal).

### Client Components

Components that use browser APIs or React hooks need `'use client'`. Everything else is a Server Component — keep it that way:

- `src/components/layout/Navigation.tsx` — `usePathname`
- `src/components/theme/theme-toggle.tsx` — `useTheme`, the `dark` class
- `src/components/ui/toggle.tsx` — Base UI `Toggle` / `ToggleGroup`
- `src/components/work/WorkList.tsx` — kind filter (`useState`)
- `src/app/(site)/error.tsx` — error boundaries must be Client Components

### Component Organization

```
src/components/
  about/    ← About page sections
  content/  ← ContentHeader (detail hero + abstract)
  home/     ← home-page pieces
  icons/    ← brand SVGs (GitHub, LinkedIn)
  layout/   ← Navigation and Footer
  mdx/      ← MDXContent renderer (react-markdown, Server Component)
  theme/    ← ThemeToggle (`dark` class)
  ui/       ← PageHeader, SectionLabel, button/badge/toggle variants
  work/     ← WorkCard (kind-driven) and WorkList (ToggleGroup filter)
```

`PageHeader` is the masthead for `/work` and `/about` — h1 at the same scale as
a detail page, optional lead, optional children (the filter row). It draws no
backdrop of its own: the sheet is one grid on `body::before` spanning the whole
document, and a second grid with a different origin is what made the page look
like it had two.

`WorkCard` renders both kinds — icon, subtitle line, and meta links branch on `item.kind`. Don't add a second card component; extend this one.

## Environment Variables

Only one, and it's optional:

- `NEXT_PUBLIC_SITE_URL` — defaults to `https://skuzmin.dev`; drives `metadataBase`, canonicals, the sitemap, robots.txt, and the OG card's domain line via [src/lib/site.ts](../src/lib/site.ts)

The build reads content from the filesystem, so **it needs no credentials and no network.** A clean clone builds with an empty environment — that's worth preserving.

**Run `bun run build:clean` before pushing.** A local `node_modules` can keep a
package alive after it leaves `package.json` — `bunx shadcn` left one behind,
and `globals.css` imported a stylesheet from it, so every local build passed
while Vercel's clean install failed.

## History

Content lived in Sanity until 2026-08-04, with an embedded Studio at `/studio`. Three documents (~6 KB of prose) did not justify ~36 MB of dependencies, a hosted service in the build path, and two required env vars. The Sanity migration scripts that earlier merged `project` + `researchPaper` into one `work` type are in git history at `ecd82c4`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
