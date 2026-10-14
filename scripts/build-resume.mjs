// Compiles latex/resume.tex into public/files/Jayesh_Padhiar_Resume.pdf.
// Run it with `npm run resume` whenever you change the LaTeX. It is not part of `npm run build`.
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const latexDir = join(root, "latex");
const outputPdf = join(root, "public", "files", "Jayesh_Padhiar_Resume.pdf");

// MacTeX/BasicTeX put their tools here and don't always add it to PATH; TinyTeX uses the second path.
const texDirs = ["/Library/TeX/texbin", join(homedir(), "Library", "TinyTeX", "bin", "universal-darwin")];
const env = { ...process.env, PATH: [process.env.PATH, ...texDirs].filter(Boolean).join(delimiter) };

if (spawnSync("latexmk", ["-v"], { env, stdio: "ignore" }).error) {
	console.error(`
latexmk (TeX) was not found, so the resume was not rebuilt. The existing PDF is unchanged.

Install a TeX once. The simplest is a full install (about 5 GB, asks for your Mac password):

  brew install --cask mactex-no-gui

(A lighter TinyTeX setup is described in latex/README.md.) Then run \`npm run resume\` again.
No PATH setup is needed.
`);
	process.exit(1);
}

const outDir = mkdtempSync(join(tmpdir(), "resume-build-"));
const compile = spawnSync(
	"latexmk",
	["-pdf", "-quiet", "-interaction=nonstopmode", "-halt-on-error", `-outdir=${outDir}`, "resume.tex"],
	{ cwd: latexDir, env, stdio: "inherit" },
);
const builtPdf = join(outDir, "resume.pdf");

if (compile.status !== 0 || !existsSync(builtPdf)) {
	console.error(`
LaTeX failed, so the resume was not rebuilt. The existing PDF is unchanged.
Log: ${join(outDir, "resume.log")}
If it says a .sty file is missing, install that package with: sudo tlmgr install <package>
`);
	process.exit(1);
}

copyFileSync(builtPdf, outputPdf);
rmSync(outDir, { recursive: true, force: true });
console.log(`Resume rebuilt: ${outputPdf}\nCommit it together with your latex/ changes.`);
