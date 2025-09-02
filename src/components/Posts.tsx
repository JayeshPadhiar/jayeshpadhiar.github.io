'use client';
import PostCard from "@/app/(pages)/posts/components/PostCard";
import { useState, useEffect } from "react";

export default function Posts({ type = "" }: { type?: string }) {
	const [posts, setPosts] = useState<any[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/v1/posts?type=${type}`);
			const data = await response.json();
			setPosts(data.posts.slice(0, 3));
		};
		fetchPosts();
	}, [type]);

	return (
		<section id="posts" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10">
			<h1 className="text-2xl font-bold">{type === 'blog' ? 'Blogs' : type === 'article' ? 'Articles' : 'Posts'}</h1>
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{posts.map((post, index) => (
					<PostCard key={index} title={post.title} link={post.link} categories={post.categories} image={post.image} createdAt={post.createdAt} description={post.description} />
				))}
			</div>
			<a href={`/posts?type=${type}`} className="flex flex-row items-center justify-start gap-2 text-foreground/80">
				View All {type === 'blog' ? 'Blogs' : type === 'article' ? 'Articles' : 'Posts'}
				<span>
					<i className={`fa-solid fa-arrow-right`}></i>
				</span>
			</a>
		</section>
	);
}