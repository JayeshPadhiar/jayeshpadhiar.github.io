"use client";
import { useId, useRef } from "react";
import type { Book } from "@/lib/books";

function Rating({ label, value, showValue = false }: { label: string; value: number; showValue?: boolean }) {
	return (
		<div className="flex items-center gap-2 text-xs text-muted">
			<span className="font-semibold">{label}:</span>
			<span className="flex gap-1" role="img" aria-label={`${value} out of 5 stars`}>
				{[1, 2, 3, 4, 5].map((star) => (
					<i
						key={star}
						aria-hidden="true"
						className={`text-star ${value >= star ? "fa-solid fa-star" : value >= star - 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}`}
					></i>
				))}
			</span>
			{showValue && <span className="text-muted">({value.toFixed(2)})</span>}
		</div>
	);
}

export default function BookCard({ book }: { book: Book }) {
	const { title, author, status, averageRating, myRating, myReview, numberOfPages, yearPublished } = book;
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const isRead = status === "read";

	return (
		<>
			<div className="relative flex flex-col items-start justify-start gap-y-2 border-1 border-border rounded-lg px-4 py-2 w-full md:max-w-[400px] self-stretch hover:border-border-strong transition-all duration-300">
				<h3 className="text-lg font-bold">{title}</h3>
				<p className="text-xs text-muted mb-2">{author}</p>
				{isRead && <Rating label="I rated" value={myRating} />}
				<p className={`text-xs mt-auto ${isRead ? "text-success" : "text-warning"}`}>
					{isRead ? "Finished" : "Reading"}
					<span> <i className={`fa-solid ${isRead ? "fa-circle-check" : "fa-book-open-reader"}`} aria-hidden="true"></i> </span>
				</p>
				{/* Covers the whole card so it can be activated by mouse or keyboard. */}
				<button
					type="button"
					onClick={() => dialogRef.current?.showModal()}
					aria-label={`Show details for ${title}`}
					className="absolute inset-0 rounded-lg cursor-pointer"
				/>
			</div>

			<dialog
				ref={dialogRef}
				aria-labelledby={titleId}
				onClick={(e) => {
					// Only the backdrop can be the click target: the dialog itself has no padding.
					if (e.target === e.currentTarget) e.currentTarget.close();
				}}
				className="m-auto w-[min(92vw,800px)] max-h-[600px] overflow-y-auto rounded-xl border border-border bg-background text-foreground p-0 shadow-lg backdrop:bg-black/40 backdrop:backdrop-blur-md"
			>
				<div className="flex flex-col items-start justify-start gap-y-2 px-4 py-2">
					<div className="flex w-full items-start justify-between gap-2">
						<h3 id={titleId} className="text-lg font-bold">{title}</h3>
						<button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close details" className="cursor-pointer px-2 py-1">
							<i className="fa-solid fa-xmark" aria-hidden="true"></i>
						</button>
					</div>
					<p className="text-xs text-muted mb-2">{author}</p>
					{isRead && <Rating label="I rated" value={myRating} />}
					<Rating label="Average Rating" value={averageRating} showValue />
					{myReview && (
						<div className="text-xs text-muted w-full">
							<span className="font-semibold">My Review:</span>
							<div className="overflow-auto max-h-[300px] w-full p-2" dangerouslySetInnerHTML={{ __html: myReview }}></div>
						</div>
					)}
					{numberOfPages > 0 && (
						<p className="text-xs text-muted">
							<span className="font-semibold">Pages:</span> {numberOfPages}
						</p>
					)}
					{yearPublished && (
						<p className="text-xs text-muted">
							<span className="font-semibold">Year Published:</span> {yearPublished}
						</p>
					)}
				</div>
			</dialog>
		</>
	);
}
