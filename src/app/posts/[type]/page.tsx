import type { Metadata } from "next";
import PostList from "@/components/PostList";
import type { PostType } from "@/lib/content";
import { POST_LABELS, POST_TYPES, postsOfType } from "@/lib/posts";

type Props = { params: Promise<{ type: PostType }> };

// Only the types below are prerendered; any other /posts/<x> is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
	return POST_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { type } = await params;

	return {
		title: POST_LABELS[type],
		description: `${POST_LABELS[type]} written by Jayesh Padhiar.`,
		alternates: { canonical: `/posts/${type}` },
	};
}

export default async function PostsByType({ params }: Props) {
	const { type } = await params;

	return <PostList title={POST_LABELS[type]} posts={postsOfType(type)} />;
}
