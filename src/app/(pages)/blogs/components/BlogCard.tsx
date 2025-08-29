export default function BlogCard({ title, link, categories, image, date, description }: { title: string, link: string, categories: string, image?: string, date?: string, description?: string }) {

	return (
		<div className="w-full flex md:flex-row flex-col-reverse items-start justify-start gap-4 border border-foreground/10 rounded-md cursor-pointer hover:border-foreground/60 transition-all duration-300">
			<div onClick={() => window.open(link, "_blank")} className="w-full flex flex-col items-start justify-start gap-4 p-4 h-full">
				<h1 className="text-xl text-foreground font-bold">{title}</h1>
				{description && (
					<p className="text-foreground/50 text-xs">{description}</p>
				)}

				<div className="flex flex-row items-center justify-between gap-2 flex-wrap mt-auto w-full">
					{categories && categories.length > 0 && (
						<div className="flex flex-row items-center justify-start gap-2 flex-wrap mt-auto">
							{categories.split(",").map((category: string, index: number) => (
								<span key={index} className="text-foreground/50 text-xs bg-foreground/10 px-2 py-1 rounded-md">{category}</span>
							))}
						</div>
					)}
					<p className="text-foreground/50 text-xs">{date}</p>
				</div>
			</div>
			{image && (
				<img
					src={image}
					alt={title}
					className="rounded-md h-full object-cover md:aspect-square md:w-36 w-full m-auto p-2"
					onError={(e) => {
						// Hide image if it fails to load
						e.currentTarget.style.display = 'none';
					}}
				/>
			)}
		</div>
	);
}