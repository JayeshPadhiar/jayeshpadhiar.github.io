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
	}

	function editBook(bookIndex: number, key: string, value: string) {
		if (key === "delete") {
			let newBooks = [...books];
			newBooks.splice(bookIndex, 1);
			setBooks(newBooks);
		} else if (key === "add") {
			let newBooks = [...books];
			newBooks.unshift({ title: "", author: "", description: "", status: "reading", type: "fiction", image: "" });
			setBooks(newBooks);
		} else {
			let newBooks = [...books];
			newBooks[bookIndex][key] = value;
			setBooks(newBooks);
		}
	}

	return (
		<section className={styles.section}>
			<button type="button" className={styles.button} onClick={() => editBook(0, "add", "")}> <i className="fa-solid fa-plus"></i> Add Book </button>
			<div className="flex flex-row w-full gap-2 items-start justify-start flex-wrap">
				{books.map((book: any, bookIndex: number) => (
					<div key={bookIndex} className={styles.bookCard}>
						<div className="flex flex-row w-full gap-2 items-center">
							<input type="text" placeholder="Book Title" className={styles.input} value={book.title} onChange={(e) => editBook(bookIndex, "title", e.target.value)} />
							<button type="button" className={styles.button} onClick={() => editBook(bookIndex, "delete", "")}> <i className="fa-solid fa-trash"></i> </button>
						</div>
						<input type="text" placeholder="Author" className={styles.input} value={book.author} onChange={(e) => editBook(bookIndex, "author", e.target.value)} />
						<textarea placeholder="Description" className={styles.textarea} value={book.description} onChange={(e) => editBook(bookIndex, "description", e.target.value)} />
						<select className={styles.select} value={book.type} onChange={(e) => editBook(bookIndex, "type", e.target.value)}>
							{["fiction", "non-fiction"].map((type) => (
								<option key={type} value={type}>{type}</option>
							))}
						</select>
						<select className={styles.select} value={book.status} onChange={(e) => editBook(bookIndex, "status", e.target.value)}>
							{["reading", "finished"].map((status) => (
								<option key={status} value={status}>{status}</option>
							))}
						</select>
					</div>
				))}
			</div>
		</section>
	)
}