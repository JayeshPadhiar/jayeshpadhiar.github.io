export default function PostSettings({ posts, setPosts }: { posts: any, setPosts: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		button: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start",
		postCard: "flex flex-col w-full gap-2 items-start my-4",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
		select: "py-1 px-2 rounded-md border-1 border-foreground/40 w-full text-xs text-foreground/80",
	}

	function editPost(postIndex: number, key: string, value: string) {
		if (key === "delete") {
			let newPosts = [...posts];
			newPosts.splice(postIndex, 1);
			setPosts(newPosts);
		} else if (key === "add") {
			let newPost = [...posts];
			newPost.unshift({ title: "", description: "", link: "", categories: "", image: "", date: new Date().toLocaleDateString() });
			setPosts(newPost);
		} else {
			let newPost = [...posts];
			newPost[postIndex][key] = value;
			setPosts(newPost);
		}
	}

	return (
		<section className={styles.section}>
			<button type="button" className={styles.button} onClick={() => editPost(0, "add", "")}> <i className="fa-solid fa-plus"></i> Add Post </button>
			<div className="flex flex-col w-full gap-2 items-start justify-start">
				{posts.map((post: any, postIndex: number) => (
					<div key={postIndex} className={styles.postCard}>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Blog Title" className={styles.input} value={post.title} onChange={(e) => editPost(postIndex, "title", e.target.value)} />
							<button type="button" className={styles.button} onClick={() => editPost(postIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						<input type="text" placeholder="Link" className={styles.input} value={post.link} onChange={(e) => editPost(postIndex, "link", e.target.value)} />
						<textarea placeholder="Description" className={styles.textarea} value={post.description} onChange={(e) => editPost(postIndex, "description", e.target.value)} />
							<input type="text" placeholder="Image URL" className={styles.input} value={post.image} onChange={(e) => editPost(postIndex, "image", e.target.value)} />
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Categories" className={styles.input} value={post.categories} onChange={(e) => editPost(postIndex, "categories", e.target.value)} />
							<input type="text" placeholder="Date" className={styles.input} value={post.date} onChange={(e) => editPost(postIndex, "date", e.target.value)} />
						</div>
					</div>
				))}
			</div>
		</section>
	)
}