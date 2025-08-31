"use client";
import { marked } from "marked";
import { useState } from "react";

export default function Editor({ content, setContent }: { content: string, setContent: (content: string) => void }) {
	const [isPreview, setIsPreview] = useState(false);
	const styles = {
		container: "w-full h-full flex flex-row items-start justify-start gap-4 p-2",
		editor: "w-full h-full flex flex-col items-start justify-start gap-4 overflow-auto",
		preview: {
			width: "100%",
			height: "100%",
			overflow: "auto",
			padding: "0.5rem",
			position: "relative" as const,
			border: "0.5px solid var(--foreground)",
			borderRadius: "10px",
		},
		previewButton: {
			position: "absolute" as const,
			top: "0.5rem",
			right: "0.5rem",
		},
	}

	return (
		//markdown editor with editor on the left and preview on the right
		<div className={styles.container}>
			<div className={`${isPreview ? 'hidden' : styles.editor}`}>
				<textarea id="textarea" className={styles.editor} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
			</div>
			<div className={`markdown-preview`} style={styles.preview as any}>
				<button style={styles.previewButton} onClick={() => setIsPreview(!isPreview)}> <i className="fa-solid fa-eye"></i> </button>
				<div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
			</div>
		</div>
	);
}