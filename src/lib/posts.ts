import raw from "@/static/posts.json";
import type { Post, PostType } from "./content";

export const POST_TYPES: PostType[] = ["blog", "article"];

export const POST_LABELS: Record<PostType, string> = {
	blog: "Blogs",
	article: "Articles",
};

// One-line clarification shown under a section's heading.
export const POST_INTROS: Partial<Record<PostType, string>> = {
	blog: "Book reviews and other writing.",
};

export const POST_DESCRIPTIONS: Record<PostType, string> = {
	blog: "Book reviews and other writing by Jayesh Padhiar.",
	article: "Articles by Jayesh Padhiar.",
};

// Pages with a "For more writing, find me on ..." footer. Only Blogs has one.
export const POST_SOURCES: Partial<Record<PostType, { name: string; url: string }>> = {
	blog: { name: "Substack", url: "https://jayeshpadhiar.substack.com" },
};

export const posts = raw as Post[];

export const postsOfType = (type: PostType) => posts.filter((post) => post.type === type);
