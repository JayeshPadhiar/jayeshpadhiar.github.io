'use client';
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "./components/PostCard";
import MainContent from "@/components/MainContent";

function PostsContent() {
	const searchParams = useSearchParams();
	const [posts, setPosts] = useState<any[]>([]);
	const [type, setType] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const postType = searchParams.get('type') || '';
		setType(postType);
		
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/v1/posts?type=${postType}`);
				const data = await response.json();
				setPosts(data?.posts || []);
			} catch (error) {
				console.error('Error fetching posts:', error);
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [searchParams]);

	return (
		<MainContent>
			<section id="posts" className="w-full h-full md:max-w-4xl flex flex-col items-start justify-start gap-4 py-8 mx-auto">
				<h1 className="text-2xl font-bold">
					{type === 'blog' ? 'Blogs' : type === 'article' ? 'Articles' : 'Posts'}
				</h1>
				
				{loading ? (
					<div className="w-full flex justify-center items-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/50"></div>
					</div>
				) : (
					<div className="w-full flex flex-col items-start justify-start gap-4 overflow-y-auto">
						{posts.length > 0 ? (
							posts.map((post, index) => (
								<PostCard 
									key={post._id || index} 
									title={post.title} 
									link={post.link} 
									categories={post.categories} 
									image={post.image} 
									createdAt={post.createdAt} 
									description={post.description} 
								/>
							))
						) : (
							<p className="text-gray-500 text-center py-8">
								No {type ? `${type}s` : 'posts'} found.
							</p>
						)}
					</div>
				)}

				<div className="w-full flex flex-row items-center justify-start gap-2 mt-auto">
					<p className="text-foreground/50 text-sm">
						For more posts, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" className="text-foreground font-bold">Medium</a> page.
					</p>
				</div>
			</section>
		</MainContent>
	);
}

export default function Posts() {
	return (
		<Suspense fallback={
			<MainContent>
				<div className="w-full h-full flex items-center justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				</div>
			</MainContent>
		}>
			<PostsContent />
		</Suspense>
	);
}