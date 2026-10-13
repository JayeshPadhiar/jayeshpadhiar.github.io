import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import MainContent from "@/components/MainContent";
import { getBooks } from "@/lib/books";
import now from "@/static/now.json";

export const metadata: Metadata = {
	title: "Now",
	description: "What Jayesh Padhiar is working on, building and reading right now.",
	alternates: { canonical: "/now" },
};

export default function Now() {
	const currentlyReading = getBooks().filter((book) => book.status === "currently-reading");

	return (
		<MainContent>
			<section className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<div className="flex flex-col items-start justify-start gap-2">
					<h1 className="text-2xl font-bold">So! Currently...</h1>
				</div>

				{currentlyReading.map((book) => (
					<BookCard key={book.title} book={book} />
				))}

				{now.sections.map((section) => (
					<div key={section.title} className="flex flex-col items-start justify-start gap-2 w-full">
						<h2 className="text-xl font-bold">{section.title}</h2>
						<p className="text-md text-muted mb-2">{section.description}</p>
						<ul className="list-disc list-inside space-y-1 ml-4">
							{section.items.map((item, idx) => (
								<li key={idx} className="text-md text-muted list-outside">
									{item}
								</li>
							))}
						</ul>
					</div>
				))}

				<p className="text-sm text-subtle">Last Updated: {now.lastUpdated}</p>
				<p className="text-md text-muted mt-4" dangerouslySetInnerHTML={{ __html: now.attribution }}></p>
			</section>
		</MainContent>
	);
}
