export default function ProjectSettings( { projects, setProjects }: { projects: any, setProjects: any } ) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	function changeProject(index: number, key: string, value: string | boolean) {
		let newProjects = [...projects];
		if (key === "delete") {
			newProjects.splice(index, 1);
		} else if (key === "add") {
			newProjects.push({ title: "Project", description: "", url: "" });
		} else {
			newProjects[index][key] = value;
		}
		setProjects([...newProjects]);
	}

	return (
		<section className={styles.section}>
		<h1 className={styles.sectionHeader}>Projects</h1>
		{projects?.map((project: { title: string, description: string, url: string }, index: number) => (
			<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
				<div className="flex flex-row w-full gap-2 items-center mt-4">
					<h1 className="text-lg font-bold">{project.title}</h1>
					<button type="button" className={styles.addButton} onClick={() => changeProject(index, "delete", true)}> <i className="fa-solid fa-trash"></i> Delete Project </button>
				</div>
				<label className={styles.label}>Title</label>
				<input type="text" placeholder="Title" className={styles.input} value={project.title} onChange={(e) => changeProject(index, "title", e.target.value)} />
				<label className={styles.label}>Description</label>
				<textarea placeholder="Description" className={styles.textarea} value={project.description} onChange={(e) => changeProject(index, "description", e.target.value)} />
				<label className={styles.label}>URL</label>
				<input type="text" placeholder="URL" className={styles.input} value={project.url} onChange={(e) => changeProject(index, "url", e.target.value)} />
			</div>
		))}
		<button type="button" className={styles.addButton} onClick={() => changeProject(projects.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Project </button>
	</section>
	);
}