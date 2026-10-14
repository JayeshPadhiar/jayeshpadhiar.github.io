import type { Metadata } from "next";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
	title: "Posts",
	description: "Blogs and articles written by Jayesh Padhiar.",
	alternates: { canonical: "/posts" },
};

export default function Posts() {
	return <PostList />;
}
