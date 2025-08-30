'use client';
import { useEffect, useState } from "react";

export default function ArticleCard({ title, link, categories, image, date, description }: { title: string, link: string, categories: string, image?: string, date?: string, description?: string }) {
	
	const [articleMetadata, setArticleMetadata] = useState<any>(null);
	async function fetchArticleMetadata() {
		try {
			const medatada = await fetch(`https://api.microlink.io/?url=${link}`);
			const metadata = await medatada.json();
			//console.log(metadata);
			setArticleMetadata(metadata);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchArticleMetadata();
	}, [link]);

	return (
		<div className="w-full flex md:flex-row flex-col-reverse items-start justify-start gap-4 border border-foreground/10 rounded-md cursor-pointer hover:border-foreground/60 transition-all duration-300">
			<div onClick={() => window.open(link, "_blank")} className="w-full flex flex-col items-start justify-start gap-4 p-4 h-full">
				<h1 className="text-xl text-foreground font-bold">{title || articleMetadata?.data?.title}</h1>
				<p className="text-foreground/50 text-xs">{description || articleMetadata?.data?.description}</p>

					{categories && categories.length > 0 && (
						<div className="flex flex-row items-center justify-start gap-2 flex-wrap mt-auto">
							{categories.split(",").map((category: string, index: number) => (
								<span key={index} className="text-foreground/50 text-xs bg-foreground/10 px-2 py-1 rounded-md">{category}</span>
							))}
						</div>
					)}
					<p className="text-foreground/50 text-xs">{date || articleMetadata?.data?.date}</p>
			</div>
			<img
				src={image || articleMetadata?.data?.image?.url || articleMetadata?.data?.logo?.url}
				alt={title}
				className="rounded-[20px] h-full object-cover md:aspect-square md:w-36 md:h-36 w-full max-h-[168px] m-auto p-2"
				onError={(e) => {
					e.currentTarget.style.display = 'none';
				}}
			/>
		</div>
	);
}