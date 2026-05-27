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

No test suite is configured. ESLint is skipped during `bun run build` (`eslint.ignoreDuringBuilds: true`).

## Architecture

Personal portfolio for Serhii Kuzmin, deployed at `sersergious.dev`. Built with **Next.js 15** (App Router, SSG), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **DaisyUI v5**.

### Routing

File-based routing via Next.js App Router under `src/app/`:

```
src/app/
  layout.tsx          ← root layout: HTML shell, Navigation, Footer, theme init script
  page.tsx            ← / (Hero + About)
  not-found.tsx       ← global 404
  projects/
    page.tsx          ← /projects list (SSG)
    [slug]/page.tsx   ← /projects/:slug detail (SSG via generateStaticParams)
  research/
    page.tsx          ← /research list (SSG)
    [slug]/page.tsx   ← /research/:slug detail (SSG via generateStaticParams)
```

Page metadata is exported via `generateMetadata()`. Data loading is async in Server Components.

### Content System

File-based MDX content in `content/{projects,research}/`. The entry point is `src/lib/mdx-content.ts`:

- Reads `.mdx` files with `gray-matter` for frontmatter
- Returns raw MDX `content` string (no pre-serialization needed)
- Computes `readingTime` and `wordCount` automatically

**MDX frontmatter schemas:**

- **Project**: `title`, `description`, `date`, `tags[]`, `category[]`, `featured`, `status` (completed/in-progress/archived), optional `github`, `demo`, `image`
- **ResearchPaper**: `title`, `abstract`, `authors[]`, `date`, `tags[]`, `featured`, `status` (published/preprint/in-review/draft), optional `journal`, `conference`, `doi`, `arxiv`, `pdf`

MDX is rendered server-side via `src/components/mdx/MDXContent.tsx` using `next-mdx-remote/rsc`'s `MDXRemote` (Server Component — no `'use client'` needed).

### Theming

DaisyUI v5 with two built-in themes:

- **Light** → `emerald` (default)
- **Dark** → `dracula` (auto-applied via `prefers-color-scheme: dark`)

Theme switching uses the `data-theme` attribute on `<html>`. The `ThemeToggle` component stores the choice in `localStorage`. A small inline `<script>` in `layout.tsx`'s `<head>` applies the saved theme before React hydrates (avoids FOUC).

### Styling

Tailwind CSS v4 with DaisyUI v5, configured in `src/styles/globals.css` via `@import 'daisyui/daisyui.css'`. PostCSS handled by `@tailwindcss/postcss`. Key semantic classes used throughout: `bg-base-100/200/300`, `text-base-content`, `text-base-content/60`, `border-base-300`, `bg-primary`, `text-primary`, `btn`, `badge`, `card`.

### Client Components

Components that use browser APIs or React hooks need `'use client'`:

- `src/components/layout/Navigation.tsx` — scroll state, mobile menu toggle, `usePathname`
- `src/components/theme/theme-toggle.tsx` — localStorage, `data-theme` toggling
- `src/components/transitions/index.tsx` — `TypewriterText` uses `useState`/`useEffect`
- `src/components/content/ContentHeader.tsx` — `navigator.share`

### Component Organization

```
src/components/
  about/        ← About page sections (all rendered on home page /)
  content/      ← Shared ContentHeader and RelatedContent
  home/         ← Hero section
  layout/       ← Navigation and Footer
  mdx/          ← MDXContent renderer (Server Component, uses next-mdx-remote/rsc)
  projects/     ← Project list and detail header components
  research/     ← Research list and detail header components
  theme/        ← ThemeToggle (DaisyUI data-theme)
  transitions/  ← Static wrappers + TypewriterText
```

## Environment Variables

- `RESEND_API_KEY` — was used for contact form (contact section removed; can be cleaned up)
