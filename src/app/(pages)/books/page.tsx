import { BookCard } from "./components/BookCard";
import MainContent from "@/components/MainContent";
import books from "@/static/books.json";

export default function Books() {
	const booksData = books.books;
	return (
		<MainContent>
			<section id="books" className="w-full flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Books I've read</h1>
				{booksData.map((category: { type: string, books: { title: string, author: string, description: string, image: string }[] }) => (
					<div key={category.type} className="flex flex-col items-start justify-start gap-4 w-full mb-8">
						<h2 className="text-xl font-bold">{category.type}</h2>
						<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
							{category.books.map((book: { title: string, author: string, description: string, image: string }) => (
								<BookCard key={book.title} title={book.title} author={book.author} description={book.description} />
							))}
						</div>
					</div>
				))}
			</section>
		</MainContent>

	);
}