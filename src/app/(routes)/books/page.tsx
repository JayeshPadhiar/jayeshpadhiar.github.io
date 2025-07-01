import { BookCard } from "./components/BookCard";
import MainContent from "@/components/MainContent";

export default function Books() {
	const books = {
		"Fiction": [
			{
				title: "To Kill a Mockingbird",
				author: "Harper Lee",
				description: "A classic novel about the moral growth of a young girl in the American South during the 1930s.",
				image: "/images/book-1.jpg"
			},
			{
				title: "Crime and Punishment",
				author: "Fyodor Dostoevsky",
				description: "A novel about the moral and spiritual struggles of the main character, Raskolnikov, who murders an empress to free himself from the burden of poverty and guilt.",
				image: "/images/book-2.jpg"
			},
			{
				title: "Days at the Morisaki Bookstore",
				author: "Satoshi Yagisawa",
				description: "A gentle, heartwarming story about a young woman who finds solace, healing, and a new sense of belonging while working at her uncle's old Tokyo bookstore.",
				image: "/images/book-3.jpg"
			},
			{
				title: "Animal Farm",
				author: "George Orwell",
				description: "A satirical allegory by George Orwell, depicting a group of farm animals who overthrow their human farmer, only to face a new tyranny among themselves.",
				image: "/images/book-4.jpg"
			},
			{
				title: "White Nights",
				author: "Fyodor Dostoevsky",
				description: "A poignant Dostoevsky novella about a lonely dreamer in St. Petersburg who experiences a brief, transformative romance over four nights.",
				image: "/images/book-5.jpg"
			},
			{
				title: "The Alchemist",
				author: "Paulo Coelho",
				description: "Paulo Coelho's philosophical novel about Santiago, a shepherd boy who embarks on a journey to find a worldly treasure, discovering his personal legend along the way.",
				image: "/images/book-6.jpg"
			},
			{
				title: "Tuesday's with Morrie",
				author: "Mitch Albom",
				description: "Mitch Albom's memoir recounting his weekly visits with his former college professor, Morrie Schwartz, who imparts life lessons while battling ALS.",
				image: "/images/book-7.jpg"
			},
			{
				title: "Metamorphosis",
				author: "Franz Kafka",
				description: "Franz Kafka's surreal novella about Gregor Samsa, who wakes up one morning transformed into a giant insect, exploring themes of alienation and identity.",
				image: "/images/book-8.jpg"
			},
			{
				title: "The Trial",
				author: "Franz Kafka",
				description: "Kafka's nightmarish novel about Josef K., a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime never revealed.",
				image: "/images/book-9.jpg"
			},
			{
				title: "The Kite Runner",
				author: "Khaled Hosseini",
				description: "Khaled Hosseini's moving tale of friendship, betrayal, and redemption set against the backdrop of Afghanistan's turbulent history.",
				image: "/images/book-15.jpg"
			},
			{
				title: "Siddhartha",
				author: "Hermann Hesse",
				description: "Hermann Hesse's philosophical novel about the spiritual journey of a young man named Siddhartha, who seeks enlightenment through meditation, self-discovery, and the pursuit of wisdom.",
				image: "/images/book-15.jpg"
			},
		],
		"Non-Fiction": [
			{
				title: "Ikigai",
				author: "Hector Garcia and Francesc Miralles",
				description: "Explores the Japanese concept of 'ikigai'—a reason for being—and how it can lead to a long, happy, and meaningful life.",
				image: "/images/book-16.jpg"
			},
			{
				title: "Life is short and so is this book",
				author: "Danny Meyer",
				description: "A collection of practical, concise life lessons and reflections on happiness, success, and living with intention.",
				image: "/images/book-17.jpg"
			},
			{
				title: "The psychology of money",
				author: "Morgan Housel",
				description: "Morgan Housel examines the ways people think about money, offering timeless lessons on wealth, greed, and happiness.",
				image: "/images/book-18.jpg"
			},
			{
				title: "The miracle morning",
				author: "Hal Elrod",
				description: "Hal Elrod presents a morning routine designed to transform your life by improving productivity, motivation, and well-being.",
				image: "/images/book-19.jpg"
			},
			{
				title: "Eat that frog",
				author: "Brian Tracy",
				description: "Brian Tracy's productivity guide focused on tackling your most important tasks first to overcome procrastination and achieve more.",
				image: "/images/book-12.jpg"
			},
			{
				title: "Kybalion",
				author: "Three Initiates",
				description: "An exploration of Hermetic philosophy, presenting seven principles believed to underlie all existence and reality.",
				image: "/images/book-13.jpg"
			},
			{
				title: "As a Man Thinketh",
				author: "James Allen",
				description: "James Allen's classic self-help book on the power of thought and its impact on character and circumstances.",
				image: "/images/book-14.jpg"
			},
			{
				title: "The Third Door",
				author: "Alex Banayan",
				description: "Alex Banayan's journey to uncover how successful people break through and achieve their goals, revealing the 'third door' approach to life.",
				image: "/images/book-10.jpg"
			},
			{
				title: "Dopamine Nation",
				author: "Anna Lembke",
				description: "Dr. Anna Lembke explores the neuroscience of pleasure and pain, addiction, and how to find balance in a dopamine-driven world.",
				image: "/images/book-11.jpg"
			},
			{
				title: "Almanack of Naval Ravikant",
				author: "Eric Jorgenson",
				description: "Eric Jorgenson's collection of quotes from Naval Ravikant, a successful entrepreneur and investor.",
				image: "/images/book-15.jpg"
			},
		]
	}

	return (
		<MainContent>
			<section id="books" className="w-full flex flex-col items-start justify-start gap-8 py-16">
				<h1 className="text-2xl font-bold">Books I've read</h1>
				{Object.keys(books).map((category) => (
					<div key={category} className="flex flex-col items-start justify-start gap-4 w-full mb-8">
						<h2 className="text-xl font-bold">{category}</h2>
						<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
							{books[category as keyof typeof books].map((book: { title: string, author: string, description: string, image: string }) => (
								<BookCard key={book.title} title={book.title} author={book.author} description={book.description} />
							))}
						</div>
					</div>
				))}
			</section>
		</MainContent>

	);
}