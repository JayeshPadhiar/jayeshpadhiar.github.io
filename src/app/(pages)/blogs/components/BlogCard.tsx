export default function BlogCard({ title, link, pubDate, categories }: { title: string, link: string, pubDate: string, categories: string[] }) {
	return (
		<div onClick={() => window.open(link, "_blank")} className="w-full flex flex-col items-start justify-start gap-4 p-4 border border-foreground/10 rounded-md cursor-pointer hover:border-foreground/60 transition-all duration-300">
			<h1 className="text-xl text-foreground font-bold">{title}</h1>
			<div>
				{categories.length > 0 && (
					<div className="flex flex-row items-center justify-start gap-2 flex-wrap">
						{categories.map((category) => (
							<span key={category} className="text-foreground/50 text-xs bg-foreground/10 px-2 py-1 rounded-md">{category}</span>
						))}
					</div>
				)}
			</div>
			<p className="text-foreground/50 text-xs">{pubDate}</p>
		</div>
	);
}