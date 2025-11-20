"use client";
import MainContent from "@/components/MainContent";
import { BookCard } from "@/app/(pages)/books/components/BookCard";
import now from "@/static/now.json";
import { useEffect, useState } from "react";

export default function Now() {

	const [nowData, setNowData] = useState<any>(now);
	const [currentlyReading, setCurrentlyReading] = useState<any[]>([]);

	useEffect(() => {
		const fetchNowData = async () => {
			try {
				const response = await fetch("/api/v1/now");
				const data = await response.json();
				setNowData(data?.now);
			} catch (error) {
				setNowData(now);
			}
		};
		const fetchBooks = async () => {
			try {
				const response = await fetch("/api/v1/books");
				const { books } = await response.json();
				setCurrentlyReading(books.filter((book: any) => book.status === "currently-reading"));
			} catch (error) {
				setCurrentlyReading([]);
			}
		};
		fetchBooks();
		fetchNowData();
	}, []);


	return (
		<MainContent>
			<section className="w-full md:max-w-4xl flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<div className="flex flex-col items-start justify-start gap-2">
					<h1 className="text-2xl font-bold">So! Currently...</h1>
				</div>

				{currentlyReading.map((item: { title: string, author: string, description: string, status: string, averageRating: number, myRating: number, myReview: string, numberOfPages: number, type: string, yearPublished: string }, idx: number) => (
					<BookCard key={idx} title={item.title} author={item.author} description={item.description} status={item.status} averageRating={item.averageRating} myRating={item.myRating} myReview={item.myReview} numberOfPages={item.numberOfPages} type={item.type} yearPublished={item.yearPublished} />
				))}

				{nowData?.sections.map((section: any, index: number) => {
					if (typeof section === 'string') return null;
					return (
						<div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
							<h2 className="text-xl font-bold">{section.title || "No title available"}</h2>
							<p className="text-md text-foreground/80 mb-2">{section.description || "No description available"}</p>
							<ul className="list-disc list-inside space-y-1 ml-4">
								{section.items.map((item: any, idx: number) => (
									<li key={idx} className="text-md text-foreground/80 list-outside">
										{typeof item === 'string' ? item : JSON.stringify(item)}
									</li>
								))}

							</ul>
						</div>
					);
				})}

				<p className="text-sm text-foreground/50">Last Updated: {nowData.lastUpdated || "Unknown"}</p>
				<p className="text-md text-foreground/80 mt-4" dangerouslySetInnerHTML={{ __html: nowData.attribution || "No attribution available" }}></p>
			</section>
		</MainContent>
	);
}