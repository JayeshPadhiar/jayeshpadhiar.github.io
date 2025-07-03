"use client";
import { useState } from "react";
import { BookCard } from "@/app/(pages)/books/components/BookCard";
import home from "@/static/home.json";

export default function Interests() {

	const [selectedInterest, setSelectedInterest] = useState("Books");
	const interests = Object.keys(home.interests);

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
					{interests.map((interest, idx) => (
						<div className={selectedInterest === interest ? styles.interestContainerSelected : styles.interestContainer} key={idx} onClick={() => setSelectedInterest(interest)}>
							<i className={`${home.interests[interest as keyof typeof home.interests].icon} ${styles.interestIcon}`}></i>
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
								<BookCard title={home.interests[selectedInterest].currentlyReading.title} author={home.interests[selectedInterest].currentlyReading.author} description="" />
							</div>
							<div className="flex flex-col items-start justify-start gap-4 w-full">
								<h1>Just finished reading:</h1>
								<BookCard title="Days at the Morisaki Bookstore" author="Satoshi Yagisawa" description="" />
							</div>
							<a href="/books" className="flex flex-row items-center justify-start gap-2 text-sm text-foreground/80 hover:text-foreground hover:underline">I've read more books :) <i className={`fa-solid fa-arrow-right`}></i></a>
						</div>

					)
				}
				{
					selectedInterest !== "Books" && (
						<div className="w-full h-full flex flex-col items-start justify-start gap-4">
							{/* @ts-ignore */}
							<p>{home.interests[selectedInterest].content}</p>
						</div>
					)
				}
			</div>
		</section>
	);
}