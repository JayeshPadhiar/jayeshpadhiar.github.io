export function BookCard({ title, author, description = "" }: { title: string, author: string, description: string }) {
	return (
		<div className="flex flex-col items-start justify-start gap-1 border-1 border-foreground/10 rounded-xl px-4 py-2 w-[400px] self-stretch">
			<h2 className="text-lg font-bold">{title}</h2>
			<p className="text-xs text-foreground/50 ">{author}</p>
			<p className="text-sm text-foreground/50 mt-2">{description}</p>
		</div>
	);
}