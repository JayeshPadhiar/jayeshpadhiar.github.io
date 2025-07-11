export default function NowSettings({ now, setNow }: { now: any, setNow: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	function editSection(index: number, key: string, value: string | boolean) {
		let newNow = [...now.sections];
		if (key === "delete") {
			newNow.splice(index, 1);
		} else if (key === "add") {
			newNow.push({ title: "", description: "", items: [""] });
		} else {
			newNow[index][key] = value;
		}
		setNow({ ...now, sections: newNow });
	}

	function editItem(sectionIndex: number, itemIndex: number, key: string, value: string | boolean) {
		let newNow = [...now.sections];
		if (key === "delete") {
			newNow[sectionIndex].items.splice(itemIndex, 1);
		} else if (key === "add") {
			newNow[sectionIndex].items.push("");
		} else {
			newNow[sectionIndex].items[itemIndex] = value;
		}
		setNow({ ...now, sections: newNow });
	}

	return (
		<section className={styles.section}>
			<div className="flex flex-col w-full gap-8 items-start">
				{now?.sections?.map((section: any, sectionIndex: number) => (
					<div key={sectionIndex} className="flex flex-col w-full gap-2 items-start">
						<div className="flex flex-row w-full gap-2 items-center">
							<h2 className="text-lg font-bold">{section.title}</h2>
							<button type="button" className={styles.addButton} onClick={() => editSection(sectionIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						<input type="text" placeholder="Title" className={styles.input} value={section.title} onChange={(e) => editSection(sectionIndex, "title", e.target.value)} />
						<textarea placeholder="Description" className={styles.textarea} value={section.description} onChange={(e) => editSection(sectionIndex, "description", e.target.value)} />
						<div className="flex flex-col w-full gap-2 items-start">
							{section.items.map((item: any, itemIndex: number) => (
								<div key={itemIndex} className="flex flex-row w-full gap-2 items-start">
									<input type="text" placeholder="Item" className={styles.input} value={item} onChange={(e) => editItem(sectionIndex, itemIndex, "item", e.target.value)} />
									<button type="button" className={styles.addButton} onClick={() => editItem(sectionIndex, itemIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
								</div>
							))}
							<button type="button" className={styles.addButton} onClick={() => editItem(sectionIndex, section.items.length, "add", "")}> <i className="fa-solid fa-plus"></i> Add Item </button>
						</div>
					</div>
				))}
				<button type="button" className={styles.addButton} onClick={() => editSection(now.length, "add", "")}> <i className="fa-solid fa-plus"></i> Add Section </button>
			</div>

			<div className="flex flex-col w-full gap-2 items-start">
				<h2 className="text-lg font-bold">Attribution</h2>
				<input type="text" placeholder="Attribution" className={styles.input} value={now.attribution} onChange={(e) => setNow({ ...now, attribution: e.target.value })} />
			</div>
		</section>
	);
}