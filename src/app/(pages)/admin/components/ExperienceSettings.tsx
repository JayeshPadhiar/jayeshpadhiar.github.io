export default function ExperienceSettings( { experience, setExperience }: { experience: any, setExperience: any } ) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
	}

	return (
		<section className={styles.section}>
								<h1 className="text-lg font-bold">Experience</h1>
								{experience?.map((experience: { company: string, title: string, location: string, roles: { period: string, title: string, description: string[] }[] }, index: number) => (
									<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
										<label className={styles.label}>Company</label>
										<input type="text" placeholder="Company" className={styles.input} value={experience.company} />
										<label className={styles.label}>Title</label>
										<input type="text" placeholder="Title" className={styles.input} value={experience.title} />
										<label className={styles.label}>Location</label>
										<input type="text" placeholder="Location" className={styles.input} value={experience.location} />
										<h1 className="text-lg font-bold">Roles</h1>
										{experience?.roles?.map((role: { period: string, title: string, description: string[] }, index: number) => (
											<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
												<label className={styles.label}>Period</label>
												<input type="text" placeholder="Period" className={styles.input} value={role.period} />
												<label className={styles.label}>Title</label>
												<input type="text" placeholder="Title" className={styles.input} value={role.title} />
												<label className={styles.label}>Description</label>
												{role.description.map((description, index) => (
													<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
														<input type="text" placeholder="Description" className={styles.input} value={description} />
													</div>
												))}
												<button type="button" className={styles.addButton} onClick={() => setExperience({ ...experience, roles: [...experience.roles, { period: "", title: "", description: [""] }] })}> <i className="fa-solid fa-plus"></i> </button>
											</div>
										))}
										<button type="button" className={styles.addButton} onClick={() => setExperience({ ...experience, roles: [...experience.roles, { period: "", title: "", description: [""] }] })}> <i className="fa-solid fa-plus"></i> Add Role </button>
									</div>
								))}
								<button type="button" className={styles.addButton} onClick={() => setExperience({ ...experience, roles: [...experience.roles, { period: "", title: "", description: [""] }] })}> <i className="fa-solid fa-plus"></i> Add Experience </button>
							</section>
	);
}