import "server-only";
import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Book = {
	title: string;
	author: string;
	status: "read" | "currently-reading";
	type: string[];
	myRating: number;
	averageRating: number;
	numberOfPages: number;
	yearPublished: string;
	dateRead: string;
	myReview: string;
};

const CSV_PATH = path.join(process.cwd(), "src", "static", "books.csv");
const SHOWN_STATUSES = ["read", "currently-reading"];

const readTime = (book: Book) => Date.parse(book.dateRead.replace(/\//g, "-")) || 0;

/**
 * Books from the Goodreads export at src/static/books.csv, newest read first.
 * Read at build time (server components only), so nothing is fetched by visitors.
 */
export function getBooks(): Book[] {
	const csv = fs.readFileSync(CSV_PATH, "utf8").replace(/^\uFEFF/, "");
	const { data } = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });

	return data
		.filter((row) => row["Title"] && SHOWN_STATUSES.includes(row["Exclusive Shelf"]))
		.map((row): Book => {
			const shelves = (row["Bookshelves"] || "").split(",").map((shelf) => shelf.trim()).filter(Boolean);
			return {
				title: row["Title"],
				author: row["Author"] || "",
				status: row["Exclusive Shelf"] as Book["status"],
				type: shelves.length ? shelves : ["uncategorized"],
				myRating: Number(row["My Rating"]) || 0,
				averageRating: Number(row["Average Rating"]) || 0,
				numberOfPages: Number(row["Number of Pages"]) || 0,
				yearPublished: row["Original Publication Year"] || row["Year Published"] || "",
				dateRead: row["Date Read"] || "",
				myReview: row["My Review"] || "",
			};
		})
		.sort((a, b) => readTime(b) - readTime(a));
}
