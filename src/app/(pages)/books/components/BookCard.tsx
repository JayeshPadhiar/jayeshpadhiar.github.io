"use client";
import { useState } from "react";

export function BookCard({ title, author, description = "", status = "finished", averageRating = 0, myRating = 0, myReview = "", numberOfPages = 0, type = "", yearPublished = "" }: { title: string, author: string, description: string, status: string, averageRating: number, myRating: number, myReview: string, numberOfPages: number, type: string, yearPublished: string }) {

	const [isExpanded, setIsExpanded] = useState(false);

	// Star rating component
	const renderStars = (rating: number) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

		// Full stars
		for (let i = 0; i < fullStars; i++) {
			stars.push(<i key={`full-${i}`} className="fa-solid fa-star text-yellow-500"></i>);
		}

		// Half star
		if (hasHalfStar) {
			stars.push(<i key="half" className="fa-solid fa-star-half-stroke text-yellow-500"></i>);
		}

		// Empty stars
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<i key={`empty-${i}`} className="fa-regular fa-star text-yellow-500"></i>);
		}
		return stars;
	};

	return (
		<>
			{/* Backdrop blur overlay */}
			{isExpanded && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
					onClick={() => setIsExpanded(false)}
				/>
			)}

			{/* Book card */}
			<div
				onClick={() => setIsExpanded(!isExpanded)}
				className={`flex flex-col items-start justify-start gap-y-2 border-1 border-foreground/10 rounded-xl px-4 py-2 w-full md:max-w-[400px] self-stretch hover:border-foreground/60 transition-all duration-300 cursor-pointer ${isExpanded ? "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-background z-50 border-1 border-foreground/20 shadow-2xl md:max-w-[800px] max-h-[600px]" : ""}`}
			>
				<h2 className="text-lg font-bold">{title}</h2>
				<p className="text-xs text-foreground/80 mb-2">{author}</p>
				{
				status === "read" && (<div className="flex items-center gap-2 text-xs text-foreground/80">
					<span className="font-semibold">I rated:</span>
					<div className="flex gap-1">
						{renderStars(myRating)}
					</div>
				</div>)
				}
				{isExpanded && (
					<div className="flex flex-col items-start justify-start w-full gap-y-2 h-full">
						<div className="flex items-center gap-2 text-xs text-foreground/80">
							<span className="font-semibold">Average Rating:</span>
							<div className="flex gap-1">
								{renderStars(averageRating)}
							</div>
							<span className="text-foreground/60">({averageRating})</span>
						</div>

						{myReview && (
							<div className="text-xs text-foreground/80">
								<span className="font-semibold">My Review:</span>
								<div className="flex gap-1 overflow-auto h-full max-h-[300px] w-full p-2">
									<p className="mt-1" dangerouslySetInnerHTML={{ __html: myReview }}></p>
								</div>
							</div>
						)}
						{numberOfPages > 0 && (
							<p className="text-xs text-foreground/80">
								<span className="font-semibold">Pages:</span> {numberOfPages}
							</p>
						)}
						{yearPublished && (
							<p className="text-xs text-foreground/80">
								<span className="font-semibold">Year Published:</span> {yearPublished}
							</p>
						)}
					</div>
				)}

				<p className="text-sm text-foreground/80 my-2">{description}</p>
				<p className={`text-xs text-foreground/80 mt-auto ${status === "read" ? "text-green-700" : "text-yellow-600"}`}>
					{status === "read" ? "Finished" : "Reading"}
					<span> <i className={`fa-solid ${status === "read" ? "fa-circle-check" : "fa-book-open-reader"}`}></i> </span>
				</p>
			</div>
		</>
	);
}