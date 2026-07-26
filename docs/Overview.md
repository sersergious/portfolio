---
tags: [project/portfolio, status/active, type/software]
created: 2026-07-13
---

# Portfolio (skuzmin.dev)

Personal portfolio for Serhii Kuzmin, deployed at `skuzmin.dev`. Built with **Next.js 16** (App Router, SSG), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **DaisyUI v5**. Content is managed in **Sanity**, with the Studio embedded at `/studio`.

> [!warning] Non-standard Next.js
> This Next.js version has breaking changes from the training-data-era Next.js — APIs, conventions, and file structure may differ. Check `node_modules/next/dist/docs/` before writing Next.js code here.

## Quick Links

- [[Architecture]]
- [[Content System]]
- [[Setup]]
- [[Status]]

## Summary

- **Routing**: file-based, App Router (`src/app/`). Projects and research share one `/work` route
- **Content**: one Sanity `work` document type, markdown body rendered server-side
- **Theming**: DaisyUI, `emerald` (light) / `dracula` (dark), toggled via `data-theme`
- **No test suite configured**
