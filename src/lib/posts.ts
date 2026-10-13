import raw from "@/static/posts.json";
import type { Post, PostType } from "./content";

export const POST_TYPES: PostType[] = ["blog", "article"];

export const POST_LABELS: Record<PostType, string> = {
	blog: "Blogs",
	article: "Articles",
};

export const posts = raw as Post[];

export const postsOfType = (type: PostType) => posts.filter((post) => post.type === type);
