"use client";
import { useState } from "react";
import Editor from "@/components/Editor";
import MainContent from "@/components/MainContent";

export default function WritePage() {
	const [content, setContent] = useState("");
	const [type, setType] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState('');

	const styles = {
		section: 'w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden p-2',
		contentContainer: 'w-full flex flex-col items-start justify-start gap-2 px-2',
		container: 'w-full flex flex-row items-center justify-between gap-2',
		input: 'w-full h-10',
		editor: 'w-full h-full flex flex-col items-start justify-start overflow-hidden',
		type: 'w-full h-10',
	};

	return (
		<MainContent>
			<section className={styles.section}>
				<div className={styles.contentContainer}>

				<div className={styles.container}>
					<input type="text" placeholder="Title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
					<button> Draft </button>
					<button> Publish </button>
				</div>

				<div className={styles.container}>
					<input type="text" placeholder="Tags" className={styles.input} value={tags} onChange={(e) => setTags(e.target.value)} />
					<select className={styles.type} value={type} onChange={(e) => setType(e.target.value)}>
						<option value="article"> Article </option>
						<option value="blog"> Blog </option>
					</select>
				</div>
				</div>

				<div className={styles.editor}>
					<Editor content={content} setContent={setContent} />
				</div>
			</section>
		</MainContent>
	);
}