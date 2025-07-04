export default function HeroSettings( { hero, setHero }: { hero: any, setHero: any } ) {


	function changeSocialLink(index: number, key: string, value: string | boolean) {
		let newSocialLinks = [...hero.socialLinks];
		if (key === "delete") {
			newSocialLinks.splice(index, 1);
		} else {
			newSocialLinks[index][key] = value;
		}
		setHero({ ...hero, socialLinks: newSocialLinks });
	}

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.sectionHeader}>Hero</h1>
			<label className={styles.label}>Name</label>
			<input type="text" placeholder="Name" className={styles.input} value={hero?.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
			<label className={styles.label}>Title</label>
			<input type="text" placeholder="Title" className={styles.input} value={hero?.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
			<label className={styles.label}>Description</label>
			<textarea placeholder="Description" className={styles.textarea} value={hero?.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} />
			<label className={styles.label}>Image URL</label>
			<input type="text" placeholder="Image URL" className={styles.input} value={hero?.image} onChange={(e) => setHero({ ...hero, image: e.target.value })} />
			<label className={styles.label}>Social Links</label>
			<div className="flex flex-row w-full gap-2 items-center flex-wrap">
				{hero?.socialLinks?.map((socialLink: { platform: string, url: string, icon: string }, index: number) => (
					<div key={index} className="flex flex-row w-full gap-2 items-center">
						<label className={styles.label}>Platform</label>
						<input type="text" placeholder={`Platform ${index + 1}`} className={styles.input} value={socialLink.platform} onChange={(e) => changeSocialLink(index, "platform", e.target.value)} />
						<label className={styles.label}>URL</label>
						<input type="text" placeholder={`Social Link ${index + 1}`} className={styles.input} value={socialLink.url} onChange={(e) => changeSocialLink(index, "url", e.target.value)} />
						<label className={styles.label}>Icon</label>
						<input type="text" placeholder={`fa-solid fa-${socialLink.platform}`} className={styles.input} value={socialLink.icon} onChange={(e) => changeSocialLink(index, "icon", e.target.value)} />
						<i className={`${socialLink.icon} text-2xl`}></i>
						<button type="button" className={styles.addButton} onClick={() => changeSocialLink(index, "delete", true)}> <i className="fa-solid fa-trash"></i> </button>
					</div>
				))}
				<button type="button" className={styles.addButton} onClick={() => setHero({ ...hero, socialLinks: [...hero.socialLinks, { icon: "", platform: "", url: "" }] })}> <i className="fa-solid fa-plus"></i> Add Social Link </button>
			</div>
		</section>
	);
}