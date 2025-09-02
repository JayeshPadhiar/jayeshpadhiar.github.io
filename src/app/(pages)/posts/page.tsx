'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "./components/PostCard";
import MainContent from "@/components/MainContent"

export default function Posts() {
	const searchParams = useSearchParams();
	const [posts, setPosts] = useState<any[]>([]);
	const [type, setType] = useState<string>("");

	useEffect(() => {
		const postType = searchParams.get('type') || '';
		setType(postType);

		const fetchPosts = async () => {
			try {
				const response = await fetch(`/api/v1/posts?type=${postType}`);
				const data = await response.json();
				setPosts(data?.posts || []);
			} catch (error) {
				console.error('Error fetching posts:', error);
				setPosts([]);
			} finally { }
		};

		fetchPosts();
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