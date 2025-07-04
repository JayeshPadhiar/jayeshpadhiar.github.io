export default function SkillSettings({ skills, setSkills }: { skills: any, setSkills: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
	}

	return (
		<section className={styles.section}>
			<h1 className="text-lg font-bold">Skills</h1>
			<div className="flex flex-row w-full gap-2 items-center flex-wrap">
				{skills?.map((category: { title: string, icon: string, skills: string[] }, index: number) => (
					<div key={index} className="flex flex-col w-full gap-2 items-start">

						<label className={styles.label}>Category Name</label>
						<input type="text" placeholder="Category Name" className={styles.input} value={category.title} />
						<label className={styles.label}>Category Icon</label>
						<input type="text" placeholder="Category Icon" className={styles.input} value={category.icon} />

						<label className={styles.label}>Skills</label>
						{category.skills.map((skill: string, index: number) => (
							<div key={index} className="flex flex-row w-full gap-2 items-center">
								<input type="text" placeholder={`Skill ${index + 1}`} className={styles.input} value={skill} />
								<button type="button" className={styles.addButton}> <i className="fa-solid fa-trash"></i> </button>
							</div>
						))}
						<button type="button" className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Skill </button>
					</div>
				))}
				<button type="button" className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Category </button>
			</div>
		</section>
	);
}