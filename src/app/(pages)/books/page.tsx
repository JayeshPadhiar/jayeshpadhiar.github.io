"use client";

import { BookCard } from "./components/BookCard";
import MainContent from "@/components/MainContent";
import books from "@/static/books.json";
import { useState, useEffect } from "react";

export default function Books() {
	const [booksData, setBooksData] = useState<any[]>([]);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const booksResponse = await fetch("/api/v1/books").then(res => res.json());
				setBooksData(booksResponse);
			} catch (error) {
				setBooksData(books);
			}
		};
		fetchBooks();
	}, []);

	return (
		<MainContent>
			<section id="books" className="w-full flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Books I've read</h1>
				{booksData.map((category: { type: string, books: { title: string, author: string, description: string, image: string, status: string }[] }) => (
					<div key={category.type} className="flex flex-col items-start justify-start gap-4 w-full mb-8">
						<h2 className="text-xl font-bold">{category.type}</h2>
						<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
							{category.books.map((book: { title: string, author: string, description: string, image: string, status: string }) => (
								<BookCard key={book.title} title={book.title} author={book.author} description={book.description} status={book.status} />
							))}
						</div>
					</div>
				))}
			</section>
		</MainContent>

	);
}