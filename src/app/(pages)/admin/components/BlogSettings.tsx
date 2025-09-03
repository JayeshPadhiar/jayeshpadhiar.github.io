export default function BlogSettings({ blogs, setBlogs }: { blogs: any, setBlogs: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		button: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start",
		blogCard: "flex flex-col w-full gap-2 items-start my-4",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
		select: "py-1 px-2 rounded-md border-1 border-foreground/40 w-full text-xs text-foreground/80",
	}

	function editBlog(blogIndex: number, key: string, value: string) {
		if (key === "delete") {
			let newBlogs = [...blogs];
			newBlogs.splice(blogIndex, 1);
			setBlogs(newBlogs);
		} else if (key === "add") {
			let newBlogs = [...blogs];
			newBlogs.unshift({ title: "", description: "", link: "", tags: "", image: "", date: new Date().toLocaleDateString() });
			setBlogs(newBlogs);
		} else {
			let newBlogs = [...blogs];
			newBlogs[blogIndex][key] = value;
			setBlogs(newBlogs);
		}
	}

	return (
		<section className={styles.section}>
			<button type="button" className={styles.button} onClick={() => editBlog(0, "add", "")}> <i className="fa-solid fa-plus"></i> Add Blog </button>
			<div className="flex flex-col w-full gap-2 items-start justify-start">
				{blogs.map((blog: any, blogIndex: number) => (
					<div key={blogIndex} className={styles.blogCard}>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Blog Title" className={styles.input} value={blog.title} onChange={(e) => editBlog(blogIndex, "title", e.target.value)} />
							<button type="button" className={styles.button} onClick={() => editBlog(blogIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						<input type="text" placeholder="Link" className={styles.input} value={blog.link} onChange={(e) => editBlog(blogIndex, "link", e.target.value)} />
						<textarea placeholder="Description" className={styles.textarea} value={blog.description} onChange={(e) => editBlog(blogIndex, "description", e.target.value)} />
							<input type="text" placeholder="Image URL" className={styles.input} value={blog.image} onChange={(e) => editBlog(blogIndex, "image", e.target.value)} />
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="tags" className={styles.input} value={blog.tags} onChange={(e) => editBlog(blogIndex, "tags", e.target.value)} />
							<input type="text" placeholder="Date" className={styles.input} value={blog.date} onChange={(e) => editBlog(blogIndex, "date", e.target.value)} />
						</div>
					</div>
				))}
			</div>
		</section>
	)
}