export default function SkillSettings({ skills, setSkills }: { skills: any, setSkills: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	function changeSkillCategory(index: number, key: string, value: string | boolean) {
		let newSkills = [...skills];
		if (key === "delete") {
			newSkills.splice(index, 1);
		} else if (key === "add") {
			newSkills.push({ id: newSkills.length + 1, title: "Skillset", icon: "fa-solid fa-toolbox", skills: [] });
		} else {
			newSkills[index][key] = value;
		}
		setSkills([...newSkills]);
	}

	function changeSkill(categoryIndex: number, skillIndex: number, key: string, value: string | boolean) {
		let newSkills = [...skills];
		if (key === "add") {
			newSkills[categoryIndex].skills.push("");
		} else if (key === "delete") {
			newSkills[categoryIndex].skills.splice(skillIndex, 1);
		} else {
			newSkills[categoryIndex].skills[skillIndex] = value;
		}
		setSkills([...newSkills])
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.sectionHeader}>Skills</h1>
			<div className="flex flex-row w-full gap-2 items-center flex-wrap">
				{skills?.map((category: { title: string, icon: string, skills: string[] }, categoryIndex: number) => (
					<div key={categoryIndex} className="flex flex-col w-full gap-2 items-start">
						<div className="flex flex-row w-full gap-2 items-center">
							<h1 className="text-lg font-bold">{category.title}</h1>
							<button type="button" className={styles.addButton} onClick={() => changeSkillCategory(categoryIndex, "delete", true)}> <i className="fa-solid fa-trash"></i> Delete Skill Category </button>
						</div>
						<label className={styles.label}>Category Name</label>
						<input type="text" placeholder="Category Name" className={styles.input} value={category.title} onChange={(e) => changeSkillCategory(categoryIndex, "title", e.target.value)} />

						<label className={styles.label}>Category Icon</label>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Category Icon" className={styles.input} value={category.icon} onChange={(e) => changeSkillCategory(categoryIndex, "icon", e.target.value)} />
							<i className={`${category.icon} text-2xl`}></i>
						</div>

						<label className={styles.label}>Skills</label>
						{category.skills.map((skill: string, skillIndex: number) => (
							<div key={skillIndex} className="flex flex-row w-full gap-2 items-center">
								<input type="text" placeholder={`Skill ${skillIndex + 1}`} className={styles.input} value={skill} onChange={(e) => changeSkill(categoryIndex, skillIndex, "skill", e.target.value)} />
								<button type="button" className={styles.addButton} onClick={() => changeSkill(categoryIndex, skillIndex, "delete", true)}> <i className="fa-solid fa-trash"></i> </button>
							</div>
						))}
						<button type="button" className={styles.addButton} onClick={() => changeSkill(categoryIndex, category.skills.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Skill </button>
					</div>
				))}
				<button type="button" className={styles.addButton} onClick={() => changeSkillCategory(skills.length, "add", true)}> <i className="fa-solid fa-plus"></i> Add Skill Category </button>
			</div>
		</section>
	);
}