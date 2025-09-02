import { marked } from "marked";
import MainContent from "@/components/MainContent";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	try {
		const { slug } = await params;
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/posts/${slug}`);
		const data = await response.json();
		const post = data.post;
		
		return {
			title: post?.title || 'Post',
			description: post?.description || post?.content?.substring(0, 160) || 'Read this post',
			// all the relevant meta tags
			openGraph: {
				title: post?.title || 'Post',
				description: post?.description || post?.content?.substring(0, 160) || 'Read this post',
				images: post?.image || post?.content?.match(/!\[.*?\]\((.*?)\)/)?.[1] || null,
				authors: post?.author || 'Jayesh Padhiar',
			},
			twitter: {
				title: post?.title || 'Post',
				description: post?.description || post?.content?.substring(0, 160) || 'Read this post',
				images: post?.image || post?.content?.match(/!\[.*?\]\((.*?)\)/)?.[1] || null,
			},
			keywords: post?.tags || 'Post',
			robots: 'index, follow',
		};
	} catch {
		return { title: 'Post' };
	}
}

// Server component - fetch data directly
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/posts/${slug}`);
	const data = await response.json();
	const post = data.post;

	return (
		<MainContent>
			<section id="post" className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<div className="w-full markdown-preview">
					<div dangerouslySetInnerHTML={{ __html: marked(post.content) }}></div>
				</div>
			</section>
		</MainContent>
	);
}