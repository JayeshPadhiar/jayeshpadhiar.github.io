"use client";
import { useState } from "react";
import Editor from "@/components/Editor";
import MainContent from "@/components/MainContent";

export default function WritePage() {
	const [text, setText] = useState("");
	const styles = {
		container: 'w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden p-2',
		title: 'text-2xl font-bold',
		editor: 'w-full h-full flex flex-col items-start justify-start overflow-hidden',
	};

	return (
		<MainContent>
			<section className={styles.container}>
				<h1 className={styles.title}>Write</h1>
				<div className={styles.editor}>
					<Editor text={text} setText={setText} />
				</div>
			</section>
		</MainContent>
	);
}