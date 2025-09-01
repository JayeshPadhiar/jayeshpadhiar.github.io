'use client';

import MainContent from "@/components/MainContent"
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

export default function Posts() {

	const [posts, setPosts] = useState<any[]>([]);

	async function fetchPosts() {
		const response = await fetch("/api/v1/posts");
		const data = await response.json();
		return data;
	}

	useEffect(() => {
		fetchPosts().then((data) => {
			setPosts(data.posts);
		});
	}, []);

	return (
		<MainContent>
			<section id="posts" className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Posts</h1>
				<div className="w-full flex flex-col  items-start justify-start gap-4 overflow-y-auto">
					{posts.map((post, index) => (
						<PostCard key={index} title={post.title} link={post.link} categories={post.categories} image={post.image} date={post.date} description={post.description} />
					))}
				</div>

				<div className="w-full flex flex-row items-center justify-start gap-2 mt-auto">
					<p className="text-foreground/50 text-sm">For more posts, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" className="text-foreground font-bold">Medium</a> page.</p>
				</div>
			</section>
		</MainContent>
	);
}