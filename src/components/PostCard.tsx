import type { Post } from "@/lib/content";

export default function PostCard({ post, titleAs: Title = "h3" }: { post: Post; titleAs?: "h2" | "h3" }) {
	const { title, link, tags, image, createdAt, description } = post;

	return (
		<div className="w-full flex md:flex-row flex-col-reverse items-start justify-start gap-4 border border-border rounded-lg hover:border-border-strong transition-all duration-300">
			<a href={link} target="_blank" rel="noopener noreferrer" className="w-full flex flex-col items-start justify-start gap-4 p-4 h-full">
				<Title className="text-xl text-foreground font-bold">{title}</Title>
				<p className="text-muted text-xs break-all">{description}</p>

				{tags && tags.length > 0 && (
					<div className="flex flex-row items-center justify-start gap-2 flex-wrap mt-auto">
						{tags.split(",").map((tag) => (
							<span key={tag} className="text-subtle text-xs bg-surface px-2 py-1 rounded-md">{tag.trim()}</span>
						))}
					</div>
				)}
				{createdAt && <p className="text-subtle text-xs">{createdAt.split("T")[0]}</p>}
			</a>
			{image && (
				// Hotlinked remote images are intentionally not run through next/image.
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={image}
					alt=""
					width={144}
					height={144}
					loading="lazy"
					referrerPolicy="no-referrer"
					className="rounded-xl h-full object-cover md:aspect-square md:w-36 md:h-36 w-full max-h-[168px] m-auto p-2"
				/>
			)}
		</div>
	);
}
