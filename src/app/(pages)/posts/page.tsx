'use client';

import MainContent from "@/components/MainContent"
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

export default function Posts({ searchParams }: { searchParams: Promise<{ type: string }> }) {

	const [posts, setPosts] = useState<any[]>([]);
	const [type, setType] = useState<string>('blog');

	async function fetchPosts() {
		const { type } = await searchParams;
		setType(type);
		try {
			const response = await fetch(`/api/v1/posts?type=${type}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchPosts().then((data) => {
			setPosts(data.posts);
		}).catch((error) => {
			console.error(error);
		});
	}, [searchParams]);

	return (
		<MainContent>
			<section id="posts" className="w-full h-full md:max-w-4xl flex flex-col items-start justify-start gap-4 py-8 mx-auto">
				<h1 className="text-2xl font-bold">{type === 'blog' ? 'Blogs' : type === 'article' ? 'Articles' : 'Posts'}</h1>
				<div className="w-full flex flex-col  items-start justify-start gap-4 overflow-y-auto">
					{posts.map((post, index) => (
						<PostCard key={index} title={post.title} link={post.link} categories={post.categories} image={post.image} createdAt={post.createdAt} description={post.description} />
					))}
				</div>

				<div className="w-full flex flex-row items-center justify-start gap-2 mt-auto">
					<p className="text-foreground/50 text-sm">For more posts, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" className="text-foreground font-bold">Medium</a> page.</p>
				</div>
			</section>
		</MainContent>
	);
}