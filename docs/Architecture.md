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

DaisyUI v5, two built-in themes:

- **Light** → `light` (`--default`)
- **Dark** → `dark` (`--prefersdark`, auto via `prefers-color-scheme: dark`)

Theme switching is handled by `next-themes` (`ThemeProvider` in `(site)/layout.tsx`, `attribute="data-theme"`, `defaultTheme="system"`). It injects its own blocking script, so there is no FOUC and no hand-written inline script.

## Styling

Tailwind CSS v4 + DaisyUI v5, configured in `src/styles/globals.css` via `@import 'daisyui/daisyui.css'`. PostCSS via `@tailwindcss/postcss`. Key semantic classes: `bg-base-100/200/300`, `text-base-content`, `text-base-content/60`, `border-base-300`, `bg-primary`, `text-primary`, `btn`, `badge`, `card`.

## Client Components

Components using browser APIs or hooks need `'use client'`. Everything else is a
Server Component:

- `src/components/layout/Navigation.tsx` — `usePathname`
- `src/components/theme/theme-toggle.tsx`, `theme-provider.tsx` — localStorage, `data-theme`
- `src/components/work/WorkList.tsx` — kind filter tabs (`useState`)
- `src/components/ui/ProtectedMailLink.tsx` — decodes the address on click

## Component Organization

```
src/components/
  about/    ← About page sections
  content/  ← ContentHeader (detail hero + abstract)
  home/     ← home-page pieces
  icons/    ← brand SVGs (GitHub, LinkedIn)
  layout/   ← Navigation and Footer
  mdx/      ← MDXContent renderer (react-markdown, Server Component)
  theme/    ← ThemeToggle / ThemeProvider (DaisyUI data-theme)
  ui/       ← SectionLabel, ProtectedMailLink
  work/     ← WorkCard (kind-driven) and WorkList (filter tabs)
```

`WorkCard` renders both kinds — icon, subtitle line, and meta links branch on
`item.kind`. Extend it rather than adding a second card.

## Related

- [[Content System]]
