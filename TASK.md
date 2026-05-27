1. Migrate from Next.js to Vite + TanStack Start

Remove all Next.js dependencies, config files, and conventions (next.config.*, _app.tsx, _document.tsx, pages/ or app/ router structure, etc.)
Scaffold a fresh Vite + TanStack Start project structure and migrate all remaining pages and components into it
Update routing to use TanStack Router conventions
Ensure all imports, aliases, and path mappings are updated accordingly in tsconfig.json / vite.config.*
Remove any Next.js-specific APIs (getServerSideProps, getStaticProps, next/image, next/link, next/head, etc.) and replace with Vite/TanStack equivalents or standard HTML/React alternatives


2. Migrate from npm / pnpm to Bun

Delete package-lock.json, pnpm-lock.yaml, and node_modules/
Run bun install to regenerate dependencies and produce bun.lockb
Replace all npm run / pnpm run / npx / pnpx calls in scripts, CI configs, and any Makefiles with bun run / bunx
Update package.json scripts to invoke bun directly
Remove .nvmrc or .node-version files; add engines: { bun: ">=1.x" } to package.json
Update any CI/CD pipeline configs to use the setup-bun action instead of setup-node


3. Remove Framer Motion

Uninstall framer-motion from dependencies
Find and delete every component, file, or code block that imports or uses framer-motion
Replace any animated wrappers with static equivalents — do not leave broken imports or missing components


4. Remove shadcn/ui

Uninstall shadcn/ui and all related packages (@radix-ui/*, class-variance-authority, clsx, tailwind-merge, lucide-react if only used by shadcn, etc.)
Delete the components/ui/ directory or wherever shadcn components live
Find and remove every import and usage of shadcn components throughout the codebase
Replace any removed UI elements with simple, unstyled, or DaisyUI-native equivalents


5. Remove the custom Gruvbox theme

Find and delete all custom Gruvbox theme definitions (CSS variables, Tailwind theme extensions, or any theme config referencing Gruvbox colors)
Remove any theme-switching logic tied to the custom theme
Clean up any leftover references in CSS files, tailwind.config.*, or component-level inline styles


6. Install and configure DaisyUI

Install daisyui and ensure it is registered as a Tailwind CSS plugin in tailwind.config.*
Configure the following built-in DaisyUI themes:

Light mode → emerald
Dark mode → dracula


Wire up theme switching so the site respects the user's system preference (or a manual toggle if one already exists), using DaisyUI's data-theme attribute on the <html> element
Do not create any custom theme overrides — use DaisyUI's built-in themes only


7. Remove the Blog section and Contact section

Delete the blog page, all blog post pages, and any dynamic blog routing entirely
Delete the contact page entirely
Remove all navigation links, footer links, or any other references pointing to /blog or /contact
Delete any data files, markdown files, CMS integrations, or utility functions that exclusively served the blog or contact functionality


8. Restructure the Home page
   The new home page should contain only:

The Hero section (keep as-is)
The About Me content (migrate fully from the standalone About Me page)

Remove the following sections from the home page entirely:

Blog highlights / recent posts
Projects highlights
Research highlights

Then delete the standalone About Me page (/about) since its content now lives on the home page. Update any internal links that pointed to /about to point to /#about or the home page root.

9. Final cleanup & verification

Delete any orphaned components, hooks, utilities, or data files no longer referenced anywhere
Ensure there are no broken imports, missing modules, or dead routes
Confirm the site builds successfully with bun run build and runs with bun run dev
Stage all changes with git add -A — do not commit
Provide a full summary of every file added, moved, modified, or deleted