import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { PostType } from "@/lib/content";
import { POST_INTROS, POST_LABELS, postsOfType } from "@/lib/posts";

export default function Posts({ type }: { type: PostType }) {
	const shown = postsOfType(type).slice(0, 3);
	const label = POST_LABELS[type];
	const intro = POST_INTROS[type];

	return (
		<section id={label.toLowerCase()} className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-border">
			<h2 className="text-2xl font-bold">{label}</h2>
			{intro && <p className="text-sm text-muted">{intro}</p>}
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{shown.map((post) => (
					<PostCard key={post.link} post={post} />
				))}
			</div>
			<Link href={`/posts/${type}`} className="flex flex-row items-center justify-start gap-2 text-muted">
				View All {label}
				<span>
					<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
				</span>
			</Link>
		</section>
	);
}
