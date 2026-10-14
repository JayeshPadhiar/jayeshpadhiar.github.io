# Resume (LaTeX)

The source of the resume PDF that the site's Resume button serves.

| File | What it is |
| --- | --- |
| `resume.tex` | Main file: contact details and which sections to include |
| `_header.tex` | Page header (name, role, contact and profile links) |
| `TLCresume.sty` | Style file: fonts, margins, colours, list styles |
| `sections/*.tex` | One file per section (experience, skills, education, publications; `projects` and `activities` are kept but commented out in `resume.tex`) |

## Updating the resume

1. Edit the `.tex` files here.
2. From the repo root, run:

   ```bash
   npm run resume
   ```

   This compiles `resume.tex` with `latexmk` (pdfLaTeX) in a temporary folder and, if it succeeds, replaces `public/files/Jayesh_Padhiar_Resume.pdf`. If LaTeX fails, the old PDF is left untouched and the log location is printed.
3. Commit the `.tex` changes and the new PDF together, and push. The Resume button and `/resume` serve the new PDF on the next deploy.

`npm run build` and the Vercel build do **not** compile the LaTeX; they just serve the committed PDF, so the build needs no TeX.

## One-time setup: a TeX install

`npm run resume` needs a TeX distribution with `latexmk`. If it isn't installed, the command says so and stops without changing anything. The command looks in `/Library/TeX/texbin` (MacTeX/BasicTeX) and `~/Library/TinyTeX` (TinyTeX) itself, so no PATH setup is needed.

**Option 1, light (this is what is set up on this Mac, about 280 MB, no password):** [TinyTeX](https://yihui.org/tinytex/) in your home folder, plus the packages this template needs:

```bash
curl -fsSL https://tinytex.yihui.org/install-bin-unix.sh -o /tmp/install-tinytex.sh
mkdir -p /tmp/tinytex-dl && sh /tmp/install-tinytex.sh /tmp/tinytex-dl --no-path
~/Library/TinyTeX/bin/universal-darwin/tlmgr install sourcesans fontaxes moresize anyfontsize \
  csquotes blindtext fontawesome titlesec enumitem standalone fancyhdr ly1 babel-english hyphen-english
```

(`--no-path` keeps it off your PATH and out of your shell config; to remove it later: `rm -rf ~/Library/TinyTeX`.)

**Option 2, full (about 5 GB, asks for your Mac password):** `brew install --cask mactex-no-gui`. Everything is included, so no package list is needed.

If LaTeX ever reports a missing `.sty` file, find its package with `tlmgr search --global --file /<name>.sty` and install it with `tlmgr install <package>` (`sudo` for MacTeX/BasicTeX).

Use pdfLaTeX (what `latexmk -pdf` does). XeLaTeX-based compilers such as Tectonic are likely to fail on this template's font packages.
