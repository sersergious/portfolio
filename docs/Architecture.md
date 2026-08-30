---
tags: [project/portfolio, type/architecture]
---

# Architecture

Part of [[Overview]].

## Routing

File-based routing via Next.js App Router under `src/app/`:

```
src/app/
  layout.tsx              ← root layout: HTML shell, theme init script
  (site)/
    layout.tsx            ← Navigation + Footer shell
    page.tsx              ← / (hero, stack, recent work, press, contact)
    about/page.tsx        ← /about
    not-found.tsx         ← 404
    work/
      page.tsx            ← /work list, all kinds (SSG)
      [slug]/page.tsx     ← /work/:slug detail (SSG via generateStaticParams)
  opengraph-image.tsx     ← generated 1200x630 social card
```

Page metadata via `generateMetadata()`. Data loading is async in Server Components.

## Redirects

`/projects` and `/research` were merged into `/work` on 2026-07-25. Both old
paths — list and `:slug` — 308 to their `/work` equivalents via `redirects()` in
`next.config.ts`. Keep them; the old URLs are indexed.

## Theming

Two themes as CSS custom properties in `src/styles/globals.css`, in shadcn's
two-tier shape: real properties on `:root` and `.dark`, aliased into Tailwind's
namespace by `@theme inline`. Both tiers exist because `@theme inline` does not
emit its variables to the document — it only inlines them into utilities — and
components reach tokens from arbitrary values such as
`color-mix(in oklab, var(--muted), #000 7%)`.

`color-scheme` is set on both themes; without it the browser paints scrollbars,
form controls and the canvas in the wrong mode.

Theme switching is `next-themes` (`ThemeProvider` in `(site)/layout.tsx`,
`attribute="class"`, `defaultTheme="system"`), with a `prefers-color-scheme`
block repeating the dark tokens under `:root:not(.light):not(.dark)` so the dark
palette survives with JS off.

## Styling

Tailwind CSS v4, no component framework. `globals.css` imports
`shadcn/tailwind.css` for keyframes and the `data-*` custom variants Base UI
keys off. PostCSS via `@tailwindcss/postcss`.

Tokens: `bg-background`, `text-foreground` (with `/15`, `/60`, `/70` opacity
steps), `bg-muted`, `bg-primary`, `text-primary-foreground`, `border-border`,
`outline-ring`. Components are cva variants in `src/components/ui/`:
`buttonVariants`, `badgeVariants`, `linkVariants`, and Base UI `ToggleGroup` /
`Toggle`.

daisyUI was removed on 2026-08-30 — see [[Status]].

## Client Components

Components using browser APIs or hooks need `'use client'`. Everything else is a
Server Component:

- `src/components/layout/Navigation.tsx` — `usePathname`
- `src/components/theme/theme-toggle.tsx`, `theme-provider.tsx` — localStorage, the `dark` class
- `src/components/ui/toggle.tsx` — Base UI `Toggle` / `ToggleGroup`
- `src/components/work/WorkList.tsx` — kind filter (`useState`)
- `src/app/(site)/error.tsx` — error boundaries must be Client Components

## Component Organization

```
src/components/
  about/    ← About page sections
  content/  ← ContentHeader (detail hero + abstract)
  home/     ← home-page pieces
  icons/    ← brand SVGs (GitHub, LinkedIn)
  layout/   ← Navigation and Footer
  mdx/      ← MDXContent renderer (react-markdown, Server Component)
  theme/    ← ThemeToggle / ThemeProvider (`dark` class)
  ui/       ← PageHeader, SectionLabel, button/badge/toggle variants
  work/     ← WorkCard (kind-driven) and WorkList (ToggleGroup filter)
```

`WorkCard` renders both kinds — icon, subtitle line, and meta links branch on
`item.kind`. Extend it rather than adding a second card.

## Related

- [[Content System]]
