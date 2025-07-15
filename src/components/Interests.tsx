"use client";
import { useState } from "react";
import { BookCard } from "@/app/(pages)/books/components/BookCard";

export default function Interests() {

	const [selectedInterest, setSelectedInterest] = useState("Books");
	const interests = {
		"Books": {
			"icon": "fa-solid fa-book",
			"currentlyReading": [
				{
					"title": "The Stranger",
					"author": "Albert Camus"
				}
			],
			"recentlyFinished": [
				{
					"title": "Days at the Morisaki Bookstore",
					"author": "Satoshi Yagisawa"
				}
			]
		},
		"Music": {
			"icon": "fa-solid fa-music",
			"content": "I love exploring new genres, from electronic swing to indie rock. Music is my go-to for focus, relaxation, and inspiration. Currently vibing to electro-swing and classic rock playlists."
		},
		"Mountaineering": {
			"icon": "fa-solid fa-mountain",
			"content": "I love to go on hikes and explore the mountains. My dream is to climb the Himalayas someday and experience the thrill and peace of high-altitude adventures."
		},
		"Football": {
			"icon": "fa-solid fa-futbol",
			"content": "I am a huge FC Barcelona fan. Whether it's watching La Liga matches or playing with friends, football is my favorite way to unwind and stay active. Força Barça!"
		}
	};

	const styles = {
		container: "w-full flex flex-col md:flex-row items-start justify-center gap-8 py-16 border-t-1 border-foreground/10",
		title: "text-2xl font-bold",
		description: "text-sm text-foreground/50",
		interestList: "flex flex-row md:flex-col items-start justify-start gap-2 flex-wrap w-full",
		interestContainer: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-foreground/10 rounded-full px-4 py-2 cursor-pointer",
		interestContainerSelected: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-foreground/80 rounded-full px-4 py-2 cursor-pointer",
		interestTitle: "text-lg font-bold",
		interestIcon: "w-5 h-5",
	}
	return (
		<section id="interests" className={styles.container}>
			<div className="w-full md:w-1/3 flex flex-col items-start justify-start gap-4">
				<h1 className={styles.title}>Interests</h1>
				<div className={styles.interestList}>
					{Object.keys(interests).map((interest, idx) => (
						<div className={selectedInterest === interest ? styles.interestContainerSelected : styles.interestContainer} key={idx} onClick={() => setSelectedInterest(interest)}>
							<i className={`${interests[interest as keyof typeof interests].icon} ${styles.interestIcon}`}></i>
							<h2 className={styles.interestTitle}>{interest}</h2>
						</div>

					))}
				</div>
			</div>
			<div className="hidden md:block h-full w-[1px] bg-foreground/10"></div>
			<div className="w-full md:w-2/3 h-full flex flex-col items-center justify-center gap-4">
				{
					selectedInterest === "Books" && (
						<div className="w-full h-full flex flex-col items-start justify-start gap-4">
							<div className="flex flex-col items-start justify-start gap-4 w-full">
								<h1>I'm currently reading:</h1>
								{interests["Books"].currentlyReading.map((book: { title: string, author: string }) => (
									<BookCard key={book.title} title={book.title} author={book.author} description="" status="reading" />
								))}
							</div>
							<div className="flex flex-col items-start justify-start gap-4 w-full">
								<h1>Just finished reading:</h1>
								{interests["Books"].recentlyFinished.map((book: { title: string, author: string }) => (
									<BookCard key={book.title} title={book.title} author={book.author} description="" status="finished" />
								))}
							</div>
							<a href="/books" className="flex flex-row items-center justify-start gap-2 text-sm text-foreground/80 hover:text-foreground hover:underline">I've read more books :) <i className={`fa-solid fa-arrow-right`}></i></a>
						</div>

					)
				}
				{
					selectedInterest !== "Books" && (
						<div className="w-full h-full flex flex-col items-start justify-start gap-4">
							{/* @ts-ignore */}
							<p>{interests[selectedInterest as keyof typeof interests].content}</p>
						</div>
					)
				}
			</div>
		</section>
	);
}