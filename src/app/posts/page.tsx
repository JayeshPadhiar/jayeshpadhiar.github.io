import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
	title: "Posts",
	description: "Blogs and articles written by Jayesh Padhiar.",
	alternates: { canonical: "/posts" },
};

export default function Posts() {
	return <PostList title="Posts" posts={posts} />;
}
