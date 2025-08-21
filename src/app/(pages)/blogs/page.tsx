'use client';

import MainContent from "@/components/MainContent"
import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";

export default function Blogs() {

	const [blogs, setBlogs] = useState<any[]>([]);

	async function fetchBlogs() {
		const response = await fetch("/api/v1/blogs");
		const data = await response.json();
		return data;
	}

	useEffect(() => {
		fetchBlogs().then((data) => {
			setBlogs(data.blogs);
		});
	}, []);

	return (
		<MainContent>
			<section id="blogs" className="w-full h-full flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Blogs</h1>
				<div className="w-full flex flex-col  items-start justify-start gap-4">
					{blogs.map((blog) => (
						<BlogCard key={blog.guid} title={blog.title} link={blog.link} pubDate={blog.pubDate} categories={blog.categories} />
					))}
				</div>

				<div className="w-full flex flex-row items-center justify-start gap-2 mt-auto">
					<p className="text-foreground/50 text-sm">For more blogs, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" className="text-foreground font-bold">Medium</a> page.</p>
				</div>
			</section>
		</MainContent>
	);
}