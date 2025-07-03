export function BookCard({ title, author, description = "", status = "finished" }: { title: string, author: string, description: string, status: string }) {
	return (
		<div className="flex flex-col items-start justify-start gap-1 border-1 border-foreground/10 rounded-xl px-4 py-2 w-full md:max-w-[400px] self-stretch">
			<h2 className="text-lg font-bold">{title}</h2>
			<p className="text-xs text-foreground/50 ">{author}</p>
			<p className="text-sm text-foreground/60 my-2">{description}</p>
			<p className={`text-xs text-foreground/60 mt-auto ${status === "finished" ? "text-green-700" : "text-yellow-600"}`}>
				{status === "finished" ? "Finished" : "Reading"}
				<span> <i className={`fa-solid ${status === "finished" ? "fa-circle-check" : "fa-book-open-reader"}`}></i> </span>
			</p>
		</div>
	);
}