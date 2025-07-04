export default function ProjectSettings( { projects, setProjects }: { projects: any, setProjects: any } ) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
	}

	return (
		<section className={styles.section}>
		<h1 className="text-lg font-bold">Projects</h1>
		{projects?.map((project: { title: string, description: string, url: string }, index: number) => (
			<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
				<h1 className="text-lg font-bold mt-4">Project {index + 1}</h1>
				<label className={styles.label}>Title</label>
				<input type="text" placeholder="Title" className={styles.input} value={project.title} />
				<label className={styles.label}>Description</label>
				<textarea placeholder="Description" className={styles.textarea} value={project.description} />
				<label className={styles.label}>URL</label>
				<input type="text" placeholder="URL" className={styles.input} value={project.url} />
			</div>
		))}
		<button type="button" className={styles.addButton} onClick={() => setProjects({ ...projects, projects: [...projects.projects, { title: "", description: "", url: "" }] })}> <i className="fa-solid fa-plus"></i> Add Project </button>
	</section>
	);
}