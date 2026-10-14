import MainContent from "@/components/MainContent";
import PostCard from "@/components/PostCard";
import type { PostType } from "@/lib/content";
import { POST_INTROS, POST_LABELS, POST_SOURCES, posts as allPosts, postsOfType } from "@/lib/posts";

// With no type, lists every post.
export default function PostList({ type }: { type?: PostType }) {
	const title = type ? POST_LABELS[type] : "Posts";
	const intro = type ? POST_INTROS[type] : undefined;
	const posts = type ? postsOfType(type) : allPosts;
	const source = type ? POST_SOURCES[type] : undefined;

	return (
		<MainContent>
			<section id="posts" className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-4 py-8 mx-auto">
				<h1 className="text-2xl font-bold">{title}</h1>
				{intro && <p className="text-sm text-muted">{intro}</p>}

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

				{source && (
					<p className="text-subtle text-sm mt-auto">
						For more writing, find me on{" "}
						<a href={source.url} target="_blank" rel="noopener noreferrer" className="text-foreground font-bold">{source.name}</a>.
					</p>
				)}
			</section>
		</MainContent>
	);
}
