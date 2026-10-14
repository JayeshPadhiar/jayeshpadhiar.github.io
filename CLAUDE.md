# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # next dev (Turbopack is the default in Next 16), http://localhost:3000
npm run build      # next build (Turbopack); also type-checks
npm run start      # serve the production build
npm run lint       # eslint . (flat config, eslint-config-next core-web-vitals + typescript); must stay at zero errors
npm run typecheck  # tsc --noEmit (run after a build, or delete .next first: stale .next/types break it)
```

There is no test suite. Verify changes with `lint`, `typecheck` and `build`; the build's route table should show only static routes (`○` / `●`, no `ƒ`).

`.kilo/worktrees/wheat-output/` is a duplicate copy of the whole repo made by another tool. It is not part of the app. It is excluded from `tsconfig.json` and the ESLint config, so ignore it when searching too.

## What this is

Jayesh Padhiar's personal portfolio (Next.js 16 App Router, React 19, Tailwind 4, TypeScript). Path alias: `@/*` → `src/*`.

It is a fully static, content-only site: no database, no auth, no API routes, no middleware, no env vars, and visitors' browsers fetch nothing from the site's own server. It used to have a MongoDB-backed admin CMS (`/admin`, `/write`, `/auth`, `/api/v1/*`); that was removed on purpose, so don't reintroduce a backend without asking.

The only third-party request left at runtime is the GitHub contribution calendar (`ContributionCalendar`, calls `github-contributions-api.jogruber.de`; it is the standalone "GitHub Activity" section after Experience), plus hotlinked post images, which are kept on purpose.

## Architecture

### Content lives in `src/static/`
To change what the site shows, edit these files and redeploy:
- `home.json`: `hero`, `about`, `skills`, `experience`, `products` and `projects` for the home page. The site is positioned as "Founder & Builder" (shippin.io, a permanent software discovery directory), with the Jio engineering role as background. `products` feeds the "Products" section (right after About): one card per product, linking out. `projects` is the open-source/GitHub section (after Experience): it is `{ visible, items }` and is **hidden while `visible` is false** (the entries are kept so it can be shown again by setting `visible` to true and editing `items`). The hero icons include X, and `Contact.tsx` has its own list of links (email and phone there must stay as they are). The hero Resume button links straight to `/files/Jayesh_Padhiar_Resume.pdf`; `Hero` renders `<Link>` for internal routes and `<a target="_blank">` for absolute URLs and `/files/*`.
- `now.json`: the `/now` page (`sections`, `lastUpdated`, `attribution`). Section list items are rendered as HTML (like the attribution), so a bullet can contain a link; only put trusted text there. Keep `lastUpdated` current when you edit it.
- `books.csv`: a Goodreads library export, **always read from `src/static/books.csv`**. To update the shelf, replace this file and redeploy. `src/lib/books.ts` (`getBooks()`, guarded with `server-only` because it uses `fs`) parses it with `papaparse` at build time. Client components must only `import type { Book }` from it. Rules in the parser:
  - Only rows whose `Exclusive Shelf` is `read` or `currently-reading` are kept (`to-read` is ignored).
  - `Bookshelves` becomes `type[]` (shelf names). A book with no shelves goes under "uncategorized".
  - The list is sorted newest `Date Read` first, and the home page's "just finished" list is the first two `read` books.
  - `/books` groups by shelf, so a book on the `currently-reading` shelf shows up in that category too.
  - Columns used: Title, Author, Exclusive Shelf, Bookshelves, My Rating, Average Rating, Number of Pages, Original Publication Year (or Year Published), Date Read, My Review. The review is rendered as HTML, so only commit your own export.
- `posts.json`: external blog/article links only (dev.to, Substack, LinkedIn). Each entry has `title`, `link`, `description`, `tags` (comma-separated string), `image`, `type` (`blog` or `article`) and `createdAt`, newest first. There are no locally hosted posts, so fill in `description` and `image` by hand; nothing fetches link metadata.

Types for this data are derived from the JSON in `src/lib/content.ts` (`typeof home.hero` etc.) plus an explicit `Post` type; `src/lib/posts.ts` wraps `posts.json` (`postsOfType`, `POST_LABELS`, `POST_TYPES`) and holds the per-page copy: `POST_SOURCES` (the "For more writing, find me on ..." footer: only the Blogs page has one, linking to Substack; Articles and the all-posts page have none), `POST_INTROS` (the Blogs one-liner: book reviews and other writing) and `POST_DESCRIPTIONS` (metadata). To give another page a footer, add it to `POST_SOURCES`.

### Routes
All routes are statically prerendered:
- `/` (home), `/books`, `/now`, `/posts` (all posts), `/posts/[type]` (`blog` or `article` via `generateStaticParams`, `dynamicParams = false`, so anything else is a 404), `/sitemap.xml`, `/robots.txt`, plus `src/app/not-found.tsx`.
- `/resume` is not a page: `next.config.ts` redirects it to the static PDF in `public/files/`. `/posts?type=blog|article` redirects to `/posts/blog|article` (the redirect keeps the query string, which is harmless). To update the resume, edit the LaTeX in `latex/` and run `npm run resume` (`scripts/build-resume.mjs`: latexmk/pdfLaTeX into a temp dir, then copies the PDF over `public/files/Jayesh_Padhiar_Resume.pdf`; it needs a TeX with latexmk: TinyTeX in `~/Library/TinyTeX` or MacTeX, setup in `latex/README.md`, and it leaves the old PDF alone if the compile fails). `npm run build` and Vercel do not compile LaTeX, so the PDF is committed; the template needs `sourcesanspro` and `fontawesome`, so use pdfLaTeX, not Tectonic/XeTeX.
- Shared components live in `src/components/` (there is no route group, and cards are not imported across route folders).

### Server vs client components
Pages and most components are server components that import the data directly. Client components are only where needed: `ThemeToggle`, `Interests` (tab state), `BookCard` (native `<dialog>`), `ContributionCalendar`. Keep `"use client"` as far down the tree as possible; `Header` and `Projects` are server components.

### Layout and theming
- The document scrolls normally (no `h-screen`/inner scrollers). The header is sticky (`--header-h`, 65px, set on md+). On md+ the home hero is `sticky` under it and the right column scrolls with the page. `html { scroll-padding-top: 5rem }` keeps anchors like `/#contact` from landing under the header.
- Theme: light (white, Vercel-style) is the default; dark is a neutral near-black. An inline script in `<head>` (`layout.tsx`) sets `data-theme` on `<html>` from `localStorage` before first paint (anything other than a saved `"dark"` is light, regardless of the OS setting). `ThemeToggle` flips the attribute and persists it; both icons are rendered and CSS picks one.
- Colors are design tokens, defined per theme in `globals.css` and exposed to Tailwind through `@theme inline`: `background`, `foreground`, `muted` (secondary text), `subtle` (captions), `surface` (chips, hover fills), `border`, `border-strong`, `focus`, `success`, `warning`, `star`. Use them (`text-muted`, `bg-surface`, `border-border`, `text-success`, ...). **Never fade `foreground` with opacity** (`text-foreground/50` is only 3.4:1 on white); all text tokens are >= 4.5:1 on `background` and `surface` in both themes. Keep the UI monochrome: color only where it carries meaning (stars, status, calendar, focus ring). Buttons are the flat `.btn` / `.btn-primary` classes; keyboard focus is the global `:focus-visible` ring. `ContributionCalendar` follows `data-theme` (the library would otherwise follow the OS).
- Tailwind v4 gotcha: unlayered CSS beats utilities. Keep element/component rules in `@layer base` / `@layer components` (the `.btn` class lives there). The theme-icon rules are deliberately unlayered because Font Awesome's own CSS is unlayered.
- `Hero` uses `next/image` with the local `public/images/profile-live.jpg`. There are no remote `next/image` sources, so `next.config.ts` has no `remotePatterns`. Post card images are plain `<img>` tags (hotlinked, lazy, `referrerPolicy="no-referrer"`) with a documented lint exception.

### Metadata and headers
- `layout.tsx` sets `metadataBase` (`src/lib/site.ts`), a title template, and site-level Open Graph/Twitter tags. Pages set their own `title`, `description` and `alternates.canonical`; they intentionally do not set `openGraph` (child `openGraph` replaces the parent's wholesale, and the images would be lost). The home page adds Person JSON-LD (`PersonJsonLd`).
- `next.config.ts` sets security headers on every route (nosniff, referrer policy, permissions policy, and a CSP limited to `frame-ancestors`/`base-uri`/`form-action`). A `script-src` CSP is deliberately not used: it needs per-request nonces, which would make every page dynamic. `object-src` is left out so the browser PDF viewer works for the resume. `poweredByHeader` is off. If a build warns that Next ignored a `package-lock.json` in a parent directory, that is a stray lockfile outside the repo and is harmless.

### Accessibility conventions
One `<h1>` per page (home: the hero name; sections are `<h2>`). The Interests switcher is a group of native `<button aria-pressed>` toggles. `BookCard` opens a native modal `<dialog>` (Escape, focus trap, click-outside close) over a full-card button. Icon-only links need an `aria-label`; decorative icons get `aria-hidden`. Review and attribution HTML is rendered with `dangerouslySetInnerHTML`, which is fine for trusted repo content; never feed it user-supplied data.
