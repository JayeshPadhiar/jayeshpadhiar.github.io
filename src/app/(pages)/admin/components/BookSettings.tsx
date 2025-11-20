import Papa from 'papaparse';

export default function BookSettings({ books, setBooks }: { books: any, setBooks: any }) {

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs text-foreground/80",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar text-foreground/80",
		button: "flex justify-center items-center h-8 min-w-8 py-4 gap-2 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-4 items-start",
		bookCard: "flex flex-col min-w-[300px] w-full max-w-[30%] gap-2 items-start my-4",
		sectionHeader: "flex flex-row w-full gap-2 items-center text-2xl font-bold",
		select: "py-1 px-2 rounded-md border-1 border-foreground/40 w-full text-xs text-foreground/80",
		table: "w-full border-collapse border border-foreground/10 p-4",
		tr: "border-b border-foreground/10",
		th: "text-left p-2",
		td: "text-left px-4 py-2",
	}

	async function saveBooks() {
		const response = await fetch(`/api/v1/books`, {
			method: "POST",
			body: JSON.stringify(books),
		});
		const data = await response.json();
		if (data.success) {
			alert("Books saved successfully");
		} else {
			alert(data.error);
		}
	}

	function uploadCSV(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					const parsedBooks = results.data.map((row: any) => {
						// Determine status: "read" shelf means "finished", otherwise "reading"
						const status = row['Exclusive Shelf'];

						// You can use the description field for additional info or leave it empty
						const yearPublished = row['Original Publication Year'] || row['Year Published'] || 'N/A';
						const numberOfPages = row['Number of Pages'] || 'N/A';
						const myRating = row['My Rating'] || 'N/A';
						const description = `Published: ${yearPublished} | Pages: ${numberOfPages} | Rating: ${myRating}/5`;

						const book = {
							title: row['Title'] || "",
							author: row['Author'] || "",
							description: description,
							status: status,
							type: row['Bookshelves'].split(',').map((type: string) => type.trim()) || [], // Default to fiction, can be manually changed
							image: "",
							myRating: row['My Rating'] || "",
							averageRating: row['Average Rating'] || "",
							numberOfPages: row['Number of Pages'] || "",
							yearPublished: row['Year Published'] || row['Original Publication Year'] || "",
							dateRead: row['Date Read'] || "",
							publisher: row['Publisher'] || "",
							isbn: row['ISBN'] || "",
							isbn13: row['ISBN13'] || "",
							myReview: row['My Review'] || "",
							binding: row['Binding'] || "",
						};
						return book;
					});

					// descending order
					const sortedBooks = parsedBooks.sort((a: any, b: any) => new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime());
					setBooks(sortedBooks);
					alert(`Successfully uploaded ${sortedBooks.length} books!`);
				},
				error: (error) => {
					console.error('Error parsing CSV:', error);
					alert('Error parsing CSV file. Please check the file format.');
				}
			});
		}
	}

	return (
		<section className={styles.section}>
			<input type="file" accept=".csv" onChange={uploadCSV} />
			<table className={styles.table}>
				<thead>
					<tr className={styles.tr}>
						<th className={styles.th}>Title</th>
						<th className={styles.th}>Author</th>
						<th className={styles.th}>Status</th>
						<th className={styles.th}>Type</th>
						<th className={styles.th}>My Rating</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book: any, bookIndex: number) => (
						<tr key={bookIndex} className={styles.tr}>
							<td className={styles.td}>{book.title}</td>
							<td className={styles.td}>{book.author}</td>
							<td className={styles.td}>{book.status}</td>
							<td className={styles.td}>{book.type.join(', ')}</td>
							<td className={styles.td}>{book.myRating}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}