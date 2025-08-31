"use client";
import { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { marked } from "marked";

export default function Editor() {

	const styles = {
		container: {
			margin: "0 auto",
			width: "100%",
			height: "100%",
		},
		editor: {
			width: "100%",
			height: "100%",
			flex: 1,
		},
		preview: {
			padding: "1rem",
			width: "100%",
			height: "100%",
			flex: 1,
			overflow: "auto",
		},
	}

	const [text, setText] = useState<string>("");

	useEffect(() => {

		import("quill").then(({ default: Quill }) => {
			const editor = document.getElementById("editor");
			if (editor) {
				const quill = new Quill(editor, {
					theme: "snow",
					});
			}
		});
	});

	return (
		//markdown editor with editor on the left and preview on the right
		<div style={styles.container} className="flex flex-row">
			<div style={styles.editor}>
				<textarea style={styles.editor} value={text} onChange={(e) => setText(e.target.value)}></textarea>
			</div>
			<div style={styles.preview} className="preview">
				<div dangerouslySetInnerHTML={{ __html: marked(text) }} style={styles.preview}></div>
			</div>
		</div>
	);
}