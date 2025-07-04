export default function AboutSettings({ about, setAbout }: { about: any, setAbout: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	function changeAbout(index: number, key: string, value: string | boolean) {
		let newAbout = [...about];
		if (key === "delete") {
			newAbout.splice(index, 1);
		} else if (key === "add") {
			newAbout.push("");
		} else {
			newAbout[index] = value;
		}
		setAbout([...newAbout]);
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.sectionHeader}>About</h1>
			{about?.map((content: string, index: number) => (
				<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
					<textarea
						placeholder="Content"
						className={styles.textarea}
						value={content}
						onChange={(e) => changeAbout(index, "content", e.target.value)}
					/>
					<button type="button" className={styles.addButton} onClick={() => changeAbout(index, "delete", true)}> <i className="fa-solid fa-trash"></i> </button>
				</div>
			))}
			<button type="button" className={styles.addButton} onClick={() => changeAbout(about.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Section </button>
		</section>
	);
}