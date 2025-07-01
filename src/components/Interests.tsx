"use client";
import { useState } from "react";
import { BookCard } from "@/app/(pages)/books/components/BookCard";
import { FaBook, FaMountain, FaMusic, FaFutbol, FaArrowRight } from "react-icons/fa";

export default function Interests() {

    const [selectedInterest, setSelectedInterest] = useState(1);

    const interests = [
        {
            id: 1,
            title: "Books",
            icon: <FaBook />,
        },
        {
            id: 2,
            title: "Music",
            icon: <FaMusic />,
        },
        {
            id: 3,
            title: "Mountaineering",
            icon: <FaMountain />,
        },
        {
            id: 4,
            title: "Football",
            icon: <FaFutbol />,
        },
    ];


    const styles = {
        container: "w-full flex flex-col md:flex-row items-start justify-center gap-4 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        description: "text-sm text-foreground/50",
        interestList: "flex flex-row md:flex-col items-start justify-start gap-2 flex-wrap w-full",
        interestContainer: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-foreground/10 rounded-full px-4 py-2 cursor-pointer",
        interestContainerSelected: "flex flex-row items-center justify-start gap-2 w-fit border-1 border-foreground/80 rounded-full px-4 py-2 cursor-pointer",
        interestTitle: "text-lg font-bold",
    }
    return (
        <section id="interests" className={styles.container}>
            <div className="w-full md:w-1/3 flex flex-col items-start justify-start gap-4">
                <h1 className={styles.title}>Interests</h1>
                <div className={styles.interestList}>
                    {interests.map((interest) => (
                        <div className={selectedInterest === interest.id ? styles.interestContainerSelected : styles.interestContainer} key={interest.id} onClick={() => setSelectedInterest(interest.id)}>
                            {interest.icon}
                            <h2 className={styles.interestTitle}>{interest.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden md:block h-full w-[1px] bg-foreground/10"></div>
            <div className="w-full md:w-2/3 h-full flex flex-col items-center justify-center gap-4">
                {
                    selectedInterest === 1 && (
                        <div className="w-full h-full flex flex-col items-start justify-start gap-4">
                            <div className="flex flex-col items-start justify-start gap-4 w-full">
                                <h1>I'm currently reading:</h1>
                                <BookCard title="To Kill a Mockingbird" author="Harper Lee" description="" />
                            </div>
                            <div className="flex flex-col items-start justify-start gap-4 w-full">
                                <h1>Just finished reading:</h1>
                                <BookCard title="Days at the Morisaki Bookstore" author="Satoshi Yagisawa" description="" />
                            </div>
                            <a href="/books" className="flex flex-row items-center justify-start gap-2 text-sm text-foreground/80 hover:text-foreground hover:underline">I've read more books :) <FaArrowRight /></a>
                        </div>

                    )
                }
                {
                    selectedInterest === 2 && (
                        <div className="flex flex-col items-start justify-start gap-4">
                            <h1>Music</h1>
                        </div>
                    )
                }
                {
                    selectedInterest === 3 && (
                        <div className="flex flex-col items-start justify-start gap-4">
                            <h1>Mountaineering</h1>
                        </div>
                    )
                }
                {
                    selectedInterest === 4 && (
                        <div className="flex flex-col items-start justify-start gap-4">
                            <h1>Football</h1>
                        </div>
                    )
                }
            </div>
        </section>
    );
}