"use client";
import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import MainContent from "@/components/MainContent";
import { useRouter } from "next/navigation";

export default function WritePage({ params }: { params: Promise<{ id: string }> }) {
	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);
	const [id, setId] = useState("");
	const [content, setContent] = useState("");
	const [type, setType] = useState("blog");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState('');

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			return;
		}
		setToken(token);
		
		params.then((data) => {
			if (data?.id?.length) {
				setId(data.id[0]);
				fetchPost(data.id[0]);
			}
		});
	}, []);

	async function fetchPost(id: string) {
		const response = await fetch(`/api/v1/posts/${id}`);
		const data = await response.json();
		setTitle(data.post.title);
		setContent(data.post.content);
		setType(data.post.type);
		setTags(data.post.tags);
	}

	async function publishPost() {
		const payload = { title, content, type, tags, isOriginal: true };
		if (id) {
			const response = await fetch(`/api/v1/posts/${id}`, {
				method: "PUT",
				body: JSON.stringify(payload),
			});
			const data = await response.json();
			if (data.success) {
				alert("Post updated successfully");
			} else {
				alert(data.error);
			}
		} else {
			const response = await fetch(`/api/v1/posts`, {
				method: "POST",
				body: JSON.stringify(payload),
			});
			const data = await response.json();
			if (data.success) {
				alert("Post created successfully");
			} else {
				alert(data.error);
			}
		}
	}

	const styles = {
		section: 'w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden p-2',
		contentContainer: 'w-full flex flex-col items-start justify-start gap-2 px-2',
		container: 'w-full flex flex-row items-center justify-between gap-2',
		input: 'w-full h-10',
		editor: 'w-full h-full flex flex-col items-start justify-start overflow-hidden',
		type: 'w-full h-10',
	};

	return (
		<MainContent>
			<section className={styles.section}>
				<div className={styles.contentContainer}>

					<div className={styles.container}>
						<input type="text" placeholder="Title" className={styles.input} value={title || ""} onChange={(e) => setTitle(e.target.value)} />
						<button> Draft </button>
						<button onClick={publishPost}> Publish </button>
					</div>

					<div className={styles.container}>
						<input type="text" placeholder="Tags" className={styles.input} value={tags || ""} onChange={(e) => setTags(e.target.value)} />
						<select className={styles.type} value={type} onChange={(e) => setType(e.target.value)}>
							<option value="article"> Article </option>
							<option value="blog"> Blog </option>
						</select>
					</div>
				</div>

				<div className={styles.editor}>
					<Editor content={content} setContent={setContent} />
				</div>
			</section>
		</MainContent>
	);
}