import MainContent from "@/components/MainContent";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/content";

export default function PostList({ title, posts }: { title: string; posts: Post[] }) {
	return (
		<MainContent>
			<section id="posts" className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-4 py-8 mx-auto">
				<h1 className="text-2xl font-bold">{title}</h1>

				{posts.length > 0 ? (
					<ul className="w-full flex flex-col items-start justify-start gap-4">
						{posts.map((post) => (
							<li key={post.link} className="w-full">
								<PostCard post={post} titleAs="h2" />
							</li>
						))}
					</ul>
				) : (
					<p className="w-full text-subtle text-center py-8">No posts found.</p>
				)}

				<p className="text-subtle text-sm mt-auto">
					For more posts, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" rel="noopener noreferrer" className="text-foreground font-bold">Medium</a> page.
				</p>
			</section>
		</MainContent>
	);
}
