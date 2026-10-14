# jayeshpadhiar.github.io

Personal portfolio built with Next.js (App Router), React, Tailwind CSS and TypeScript. It is a fully static site: no database, no API routes and no environment variables.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build; all routes are prerendered
npm run start      # serve the production build
```

Requires Node 20.9 or newer.

## Updating content

Everything the site shows lives in `src/static/`. Edit the file and redeploy.

| File | What it drives |
| --- | --- |
| `home.json` | Hero, About, Products, Skills, Experience, and Projects (hidden until `projects.visible` is `true`) |
| `now.json` | The `/now` page |
| `posts.json` | Blog and article links (`/posts`, `/posts/blog`, `/posts/article`, and the home sections) |
| `books.csv` | The bookshelf, parsed at build time |

**Books:** export your library from Goodreads (My Books, then Import and export, then Export Library) and replace `src/static/books.csv` with the file. Only the `read` and `currently-reading` shelves are shown, and newest read comes first. The export includes your review text, so only commit it if you are happy for that to be public.

**Resume:** the LaTeX source is in `latex/`. After changing it, run `npm run resume` (rebuilds `public/files/Jayesh_Padhiar_Resume.pdf`) and commit both. `/resume` redirects to that PDF. See `latex/README.md`.
