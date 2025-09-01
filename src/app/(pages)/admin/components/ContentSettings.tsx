export default function ContentSettings({ content, setContent }: { content: any, setContent: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		button: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start",
		contentCard: "flex flex-col w-full gap-2 items-start my-4",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
		select: "py-1 px-2 rounded-md border-1 border-foreground/40 w-full text-xs text-foreground/80",
	}

	function editContent(contentIndex: number, key: string, value: string) {
		if (key === "delete") {
			let newContent = [...content];
			newContent.splice(contentIndex, 1);
			setContent(newContent);
		} else if (key === "add") {
			let newContent = [...content];
			newContent.unshift({ title: "", description: "", link: "", categories: "", image: "", date: new Date().toLocaleDateString() });
			setContent(newContent);
		} else {
			let newContent = [...content];
			newContent[contentIndex][key] = value;
			setContent(newContent);
		}
	}

	return (
		<section className={styles.section}>
			<button type="button" className={styles.button} onClick={() => editContent(0, "add", "")}> <i className="fa-solid fa-plus"></i> Add Content </button>
			<div className="flex flex-col w-full gap-2 items-start justify-start">
				{content.map((content: any, contentIndex: number) => (
					<div key={contentIndex} className={styles.contentCard}>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Blog Title" className={styles.input} value={content.title} onChange={(e) => editContent(contentIndex, "title", e.target.value)} />
							<button type="button" className={styles.button} onClick={() => editContent(contentIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						<input type="text" placeholder="Link" className={styles.input} value={content.link} onChange={(e) => editContent(contentIndex, "link", e.target.value)} />
						<textarea placeholder="Description" className={styles.textarea} value={content.description} onChange={(e) => editContent(contentIndex, "description", e.target.value)} />
							<input type="text" placeholder="Image URL" className={styles.input} value={content.image} onChange={(e) => editContent(contentIndex, "image", e.target.value)} />
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Categories" className={styles.input} value={content.categories} onChange={(e) => editContent(contentIndex, "categories", e.target.value)} />
							<input type="text" placeholder="Date" className={styles.input} value={content.date} onChange={(e) => editContent(contentIndex, "date", e.target.value)} />
						</div>
					</div>
				))}
			</div>
		</section>
	)
}