"use client";
import { useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import type { Book } from "@/lib/books";

const interests: Record<string, { icon: string; content?: string }> = {
	"Books": {
		"icon": "fa-solid fa-book",
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

export default function Interests({ currentlyReading, recentlyFinished }: { currentlyReading: Book[], recentlyFinished: Book[] }) {
	const [selectedInterest, setSelectedInterest] = useState("Books");

	const styles = {
		container: "w-full flex flex-col md:flex-row items-start justify-center gap-8 py-16 border-t-1 border-border",
		title: "text-2xl font-bold",
		interestList: "flex flex-row md:flex-col items-start justify-start gap-2 flex-wrap w-full",
		interestContainer: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-border rounded-full px-4 py-2 cursor-pointer",
		interestContainerSelected: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-foreground rounded-full px-4 py-2 cursor-pointer",
		interestTitle: "text-lg font-bold",
		interestIcon: "w-5 h-5",
	}
	return (
		<section id="interests" className={styles.container}>
			<div className="w-full md:w-1/3 flex flex-col items-start justify-start gap-4">
				<h2 className={styles.title}>Interests</h2>
				<div role="group" aria-label="Interests" className={styles.interestList}>
					{Object.entries(interests).map(([name, { icon }]) => (
						<button
							type="button"
							aria-pressed={selectedInterest === name}
							className={selectedInterest === name ? styles.interestContainerSelected : styles.interestContainer}
							key={name}
							onClick={() => setSelectedInterest(name)}
						>
							<i className={`${icon} ${styles.interestIcon}`} aria-hidden="true"></i>
							<span className={styles.interestTitle}>{name}</span>
						</button>
					))}
				</div>
			</div>
			<div className="hidden md:block h-full w-[1px] bg-border"></div>
			<div className="w-full md:w-2/3 h-full flex flex-col items-center justify-center gap-4">
				{selectedInterest === "Books" ? (
					<div className="w-full h-full flex flex-col items-start justify-start gap-4">
						<div className="flex flex-col items-start justify-start gap-4 w-full">
							<h3>I&apos;m currently reading:</h3>
							{currentlyReading.map((book) => (
								<BookCard key={book.title} book={book} />
							))}
						</div>
						<div className="flex flex-col items-start justify-start gap-4 w-full">
							<h3>Just finished reading:</h3>
							{recentlyFinished.map((book) => (
								<BookCard key={book.title} book={book} />
							))}
						</div>
						<Link href="/books" className="flex flex-row items-center justify-start gap-2 text-sm text-muted hover:text-foreground hover:underline">I&apos;ve read more books :) <i className="fa-solid fa-arrow-right" aria-hidden="true"></i></Link>
					</div>
				) : (
					<div className="w-full h-full flex flex-col items-start justify-start gap-4">
						<p>{interests[selectedInterest].content}</p>
					</div>
				)}
			</div>
		</section>
	);
}
