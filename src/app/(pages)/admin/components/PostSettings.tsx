export default function PostSettings({ posts, setPosts }: { posts: any, setPosts: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		button: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start h-full overflow-hidden",
		postCard: "flex flex-col w-full gap-2 items-start my-4 p-4 border border-foreground/30 rounded-md hover:border-foreground/60 transition-all duration-300",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
		select: "py-1 px-2 rounded-md border-1 border-foreground/40 w-full text-xs text-foreground/80 overflow-hidden",
	}

	function editPost(postIndex: number, key: string, value: string) {
		if (key === "add") {
			let newPost = [...posts];
			newPost.unshift({ title: "", description: "", link: "", categories: "", image: "", date: new Date().toLocaleDateString(), type: "blog" });
			setPosts(newPost);
		} else {
			let newPost = [...posts];
			newPost[postIndex][key] = value;
			setPosts(newPost);
		}
	}

	async function deletePost(postIndex: number) {
	 	const response = await fetch(`/api/v1/posts/${posts[postIndex].slug}`, {
			method: "DELETE",
		});
		const data = await response.json();
		if (data?.success) {
			alert("Post deleted successfully");
			let newPosts = [...posts];
			newPosts.splice(postIndex, 1);
			setPosts(newPosts);
		} else {
			alert(data?.error);
		}
	}

	// if new post, create a new post
	// if existing post, update the post
	async function savePost(postIndex: number) {
		let response: any;
		console.log(posts[postIndex]);
		const payload = { ...posts[postIndex] };
		if (payload.slug) {
			response = await fetch(`/api/v1/posts/${payload.slug}`, {
				method: "PUT",
				body: JSON.stringify(payload),
			});
		} else {
			response = await fetch(`/api/v1/posts`, {
				method: "POST",
				body: JSON.stringify(payload),
			});
		}
		const data = await response.json();
		if (data?.success) {
			alert("Post saved successfully");
		} else {
			alert(data?.error);
		}
	}

	function updateOriginalPost(postIndex: number) {
		console.log(posts[postIndex]);
		//redirect to write page
		window.location.href = `/write/${posts[postIndex].slug}`;
	}

	return (
		<section className={styles.section}>
			<button type="button" className={styles.button} onClick={() => editPost(0, "add", "")}> <i className="fa-solid fa-plus"></i> Add Post </button>
			<div className="h-full flex flex-col w-full gap-2 items-start justify-start scrollbar-thin overflow-y-auto">
				{posts.map((post: any, postIndex: number) => (
					<div key={postIndex} className={styles.postCard}>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Post Title" className={styles.input} value={post.title} onChange={(e) => editPost(postIndex, "title", e.target.value)} />
							{post.isOriginal && <button type="button" className={styles.button} onClick={() => updateOriginalPost(postIndex)}> <i className="fa-solid fa-pencil"></i> </button>}
							<button type="button" className={styles.button} onClick={() => deletePost(postIndex)}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						{!post.isOriginal && <input type="text" placeholder="Link" className={styles.input} value={post.link} onChange={(e) => editPost(postIndex, "link", e.target.value)} />}
						<textarea placeholder="Description" className={styles.textarea} value={post.description} onChange={(e) => editPost(postIndex, "description", e.target.value)} />
						<input type="text" placeholder="Image URL" className={styles?.input} value={post.image} onChange={(e) => editPost(postIndex, "image", e.target.value)} />
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Categories" className={styles.input} value={post.categories} onChange={(e) => editPost(postIndex, "categories", e.target.value)} />
							<input type="datetime-local" placeholder="Date" className={styles.input} value={post.createdAt} onChange={(e) => editPost(postIndex, "createdAt", e.target.value)} />
							<select name="" id="" className={styles.select} value={post.type} onChange={(e) => editPost(postIndex, "type", e.target.value)}>
								<option value="blog">Blog</option>
								<option value="article">Article</option>
							</select>
						</div>

						<button type="button" className={styles.button} onClick={() => savePost(postIndex)}> <i className="fa-solid fa-save"></i> </button>
					</div>
				))}
			</div>
		</section>
	)
}