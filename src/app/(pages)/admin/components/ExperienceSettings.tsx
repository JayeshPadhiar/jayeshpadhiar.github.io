export default function ExperienceSettings({ experience, setExperience }: { experience: any, setExperience: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	function changeExperience(experienceIndex: number, key: string, value: string | boolean) {
		let newExperience = [...experience];
		if (key === "delete") {
			newExperience.splice(experienceIndex, 1);
		} else if (key === "add") {
			newExperience.push({ company: "Company", location: "", roles: [{ period: "", title: "Role", description: [""] }] });
		} else {
			newExperience[experienceIndex][key] = value;
		}
		setExperience([...newExperience]);
	}

	function changeRole(experienceIndex: number, roleIndex: number, key: string, value: string | boolean) {
		let newExperience = [...experience];
		if (key === "delete") {
			newExperience[experienceIndex].roles.splice(roleIndex, 1);
		} else if (key === "add") {
			newExperience[experienceIndex].roles.push({ period: "", title: "Role", description: [""] });
		} else {
			newExperience[experienceIndex].roles[roleIndex][key] = value;
		}
		setExperience([...newExperience]);
	}

	function changeDescription(experienceIndex: number, roleIndex: number, descriptionIndex: number, key: string, value: string | boolean) {
		let newExperience = [...experience];
		if (key === "delete") {
			newExperience[experienceIndex].roles[roleIndex].description.splice(descriptionIndex, 1);
		} else {
			if (key === "add") {
				newExperience[experienceIndex].roles[roleIndex].description.push("");
			} else {
				newExperience[experienceIndex].roles[roleIndex].description[descriptionIndex] = value;
			}
		}
		setExperience([...newExperience]);
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.sectionHeader}>Experience</h1>
			{experience?.map((experience: { company: string, title: string, location: string, roles: { period: string, title: string, description: string[] }[] }, experienceIndex: number) => (
				<div key={experienceIndex} className="flex flex-col w-full h-full gap-2 items-start mb-4">
					<div className="flex flex-row w-full gap-2 items-center">
						<h1 className="text-xl font-bold">{experience.company}</h1>
						<button type="button" className={styles.addButton} onClick={() => changeExperience(experienceIndex, "delete", true)}> <i className="fa-solid fa-trash"></i> Delete Experience </button>
					</div>
					<label className={styles.label}>Company</label>
					<input type="text" placeholder="Company" className={styles.input} value={experience.company} onChange={(e) => changeExperience(experienceIndex, "company", e.target.value)} />
					<label className={styles.label}>Location</label>
					<input type="text" placeholder="Location" className={styles.input} value={experience.location} onChange={(e) => changeExperience(experienceIndex, "location", e.target.value)} />
					<h1 className="text-lg font-bold mt-4">Roles</h1>
					{experience?.roles?.map((role: { period: string, title: string, description: string[] }, roleIndex: number) => (
						<div key={roleIndex} className="flex flex-col w-full h-full gap-2 items-start">
							<div className="flex flex-row w-full gap-2 items-center">
								<h1 className="text-lg font-bold">{role.title}</h1>
								<button type="button" className={styles.addButton} onClick={() => changeRole(experienceIndex, roleIndex, "delete", true)}> <i className="fa-solid fa-trash"></i> Delete Role </button>
							</div>
							<label className={styles.label}>Title</label>
							<input type="text" placeholder="Title" className={styles.input} value={role.title} onChange={(e) => changeRole(experienceIndex, roleIndex, "title", e.target.value)} />
							<label className={styles.label}>Period</label>
							<input type="text" placeholder="Period" className={styles.input} value={role.period} onChange={(e) => changeRole(experienceIndex, roleIndex, "period", e.target.value)} />
							<label className={styles.label}>Description</label>
							{role.description.map((description, descriptionIndex: number) => (
								<div key={descriptionIndex} className="flex flex-row w-full gap-2 items-center">
									<input type="text" placeholder="Description" className={styles.input} value={description} onChange={(e) => changeDescription(experienceIndex, roleIndex, descriptionIndex, "description", e.target.value)} />
									<button type="button" className={styles.addButton} onClick={() => changeDescription(experienceIndex, roleIndex, descriptionIndex, "delete", true)}> <i className="fa-solid fa-trash"></i></button>
								</div>
							))}
							<button type="button" className={styles.addButton} onClick={() => changeDescription(experienceIndex, roleIndex, role.description.length, "add", true)}> <i className="fa-solid fa-plus"></i> </button>
						</div>
					))}
					<button type="button" className={styles.addButton} onClick={() => changeRole(experienceIndex, experience.roles.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Role </button>
				</div>
			))}
			<button type="button" className={styles.addButton} onClick={() => changeExperience(experience.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Experience </button>
		</section>
	);
}