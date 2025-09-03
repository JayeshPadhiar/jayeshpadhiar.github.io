'use client';
import { useEffect, useState } from "react";

export default function PostCard({ title, link, tags, image, createdAt, description }: { title: string, link: string, tags: string, image?: string, createdAt?: string, description?: string }) {
	
	const [postMetadata, setPostMetadata] = useState<any>(null);
	async function fetchPostMetadata() {
		try {
			console.log(tags);
			const medatada = await fetch(`https://api.microlink.io/?url=${link}`);
			const metadata = await medatada.json();
			//console.log(metadata);
			setPostMetadata(metadata);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		console.log(tags);
		fetchPostMetadata();
	}, [link]);

	return (
		<div className="w-full flex md:flex-row flex-col-reverse items-start justify-start gap-4 border border-foreground/10 rounded-md cursor-pointer hover:border-foreground/60 transition-all duration-300">
			<div onClick={() => window.open(link, "_blank")} className="w-full flex flex-col items-start justify-start gap-4 p-4 h-full">
				<h1 className="text-xl text-foreground font-bold">{title || postMetadata?.data?.title}</h1>
				<p className="text-foreground/50 text-xs">{description || postMetadata?.data?.description}</p>

					{tags && tags.length > 0 && (
						<div className="flex flex-row items-center justify-start gap-2 flex-wrap mt-auto">
							{tags.split(",").map((tag: string, index: number) => (
								<span key={index} className="text-foreground/50 text-xs bg-foreground/10 px-2 py-1 rounded-md">{tag.trim()}</span>
							))}
						</div>
					)}
					<p className="text-foreground/50 text-xs">{(createdAt || postMetadata?.data?.date).split("T")[0]}</p>
			</div>
			{(image || postMetadata?.data?.image?.url || postMetadata?.data?.logo?.url) && <img
				src={image || postMetadata?.data?.image?.url || postMetadata?.data?.logo?.url}
				className="rounded-[20px] h-full object-cover md:aspect-square md:w-36 md:h-36 w-full max-h-[168px] m-auto p-2"
				onError={(e) => {
					e.currentTarget.style.display = 'none';
				}}
			/>}
		</div>
	);
}