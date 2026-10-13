import type { Metadata } from "next";
import BookCard from "@/components/BookCard";
import MainContent from "@/components/MainContent";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = {
	title: "Bookshelf",
	description: "Books Jayesh Padhiar has read or is reading, with ratings and reviews.",
	alternates: { canonical: "/books" },
};

export default function Books() {
	const books = getBooks();
	const types = [...new Set(books.flatMap((book) => book.type))].sort((a, b) => a.localeCompare(b));
	const booksByType = types.map((type) => ({
		type,
		books: books.filter((book) => book.type.includes(type)).sort((a, b) => a.status.localeCompare(b.status)),
	}));

	return (
		<MainContent>
			<section id="books" className="w-full flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Books I&apos;ve read</h1>
				{booksByType.map((category) => (
					<div key={category.type} className="flex flex-col items-start justify-start gap-4 w-full mb-8">
						<h2 className="text-xl font-bold">{category.type.charAt(0).toUpperCase() + category.type.slice(1)}</h2>
						<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
							{category.books.map((book) => (
								<BookCard key={book.title} book={book} />
							))}
						</div>
					</div>
				))}
			</section>
		</MainContent>
	);
}
