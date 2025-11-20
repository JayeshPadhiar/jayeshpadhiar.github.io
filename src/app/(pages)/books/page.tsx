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
				const allTypes: string[] = [];
				booksResponse.books.map((book: any) => {
					book.type.forEach((type: string) => {
						allTypes.push(type);
					});
				});
				const types = [...new Set(allTypes)];
				types.sort((a: string, b: string) => a.localeCompare(b));
				const booksByType = types.map((type: any) => {
					return {
						type,
						books: booksResponse.books.filter((book: any) => book.type.includes(type)).sort((a: any, b: any) => a.status.localeCompare(b.status))
					}
				});
				setBooksData(booksByType);
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
				{booksData.map((category: { type: string, books: { title: string, author: string, description: string, image: string, status: string, averageRating: number, myRating: number, myReview: string, numberOfPages: number, type: string, yearPublished: string }[] }) => (
					<div key={category.type} className="flex flex-col items-start justify-start gap-4 w-full mb-8">
						<h2 className="text-xl font-bold">{category.type.charAt(0).toUpperCase() + category.type.slice(1)}</h2>
						<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
							{category.books.map((book: { title: string, author: string, description: string, image: string, status: string, averageRating: number, myRating: number, myReview: string, numberOfPages: number, type: string, yearPublished: string }) => (
								<BookCard key={book.title} title={book.title} author={book.author} description={book.description} status={book.status} averageRating={book.averageRating} myRating={book.myRating} myReview={book.myReview} numberOfPages={book.numberOfPages} type={book.type} yearPublished={book.yearPublished} />
							))}
						</div>
					</div>
				))}
			</section>
		</MainContent>

	);
}