import { marked } from "marked";
import MainContent from "@/components/MainContent";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	try {
		console.log('params.id', params.id);
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/posts/${params.id}`);
		const data = await response.json();
		const post = data.post;
		
		return {
			title: post?.title || 'Post',
			description: post?.description || post?.content?.substring(0, 160) || 'Read this post'
		};
	} catch {
		return { title: 'Post' };
	}
}

// Server component - fetch data directly
export default async function Post({ params }: { params: { id: string } }) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/posts/${params.id}`);
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