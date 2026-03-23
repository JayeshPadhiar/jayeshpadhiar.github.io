import { useState } from "react";

export default function ResumeSettings({ resumeHtml, setResumeHtml }: { resumeHtml: string, setResumeHtml: (html: string) => void }) {

	const [showPreview, setShowPreview] = useState(false);

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		textarea: "py-2 px-3 rounded-lg border-1 border-foreground/10 w-full h-[500px] text-xs font-mono no-scrollbar resize-y",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.sectionHeader}>Resume HTML</h1>
			<p className={styles.label}>Paste your resume HTML code below. This will be rendered at /resume where visitors can print it with Ctrl+P.</p>
			<textarea
				placeholder="<html>...</html>"
				className={styles.textarea}
				value={resumeHtml}
				onChange={(e) => setResumeHtml(e.target.value)}
			/>
			<button
				type="button"
				className={styles.addButton + " px-4"}
				onClick={() => setShowPreview(!showPreview)}
			>
				<i className={`fa-solid ${showPreview ? 'fa-eye-slash' : 'fa-eye'}`}></i>
				{showPreview ? 'Hide Preview' : 'Show Preview'}
			</button>
			{showPreview && (
				<div className="w-full border-1 border-foreground/10 rounded-lg overflow-auto bg-white">
					<iframe
						srcDoc={resumeHtml}
						className="w-full min-h-[600px] border-0"
						title="Resume Preview"
						sandbox="allow-same-origin"
					/>
				</div>
			)}
		</section>
	);
}
