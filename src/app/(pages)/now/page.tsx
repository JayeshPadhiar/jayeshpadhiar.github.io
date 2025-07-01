import MainContent from "@/components/MainContent";
import { BookCard } from "@/app/(pages)/books/components/BookCard";

export default function Now() {
	const now = {
		lastUpdated: "June 2025",
		currentWork: {
			title: "Current Work",
			description: "Pretending to be a Fullstack Developer at Jio (they haven't caught on yet).",
			items: [
				"Breaking and occasionally fixing high-traffic web apps.",
				"Leading fullstack development for B2B/B2C platforms (mostly by Googling stuff).",
				"Optimizing backend services and API performance, or at least trying not to make them worse."
			]
		},
		sideProjects: {
			title: "Side Projects",
			description: "Building things nobody asked for, but everyone will definitely need (someday).",
			items: [
				"Personal portfolio website using Next.js and TypeScript, because why not?",
				"Contributing to open-source projects and hoping someone notices.",
				"Exploring new web technologies and frameworks, mostly to avoid actual work."
			]
		},
		learning: {
			title: "Learning",
			description: "Currently expanding my knowledge in things I'll probably forget by next week.",
			items: [
				"Data Structures and Algorithms (so I can finally understand those LeetCode memes)."
			]
		},
		reading: {
			title: "Reading",
			description: "Books I'm currently reading (or at least pretending to read on Zoom calls):",
			items: [
				<BookCard title="Frankenstein" author="Mary Shelley" description="" />
			]
		},
		health: {
			title: "Health & Habits",
			description: "Trying to be healthy so I can live long enough to finish my Netflix watchlist.",
			items: [
				"Regular exercise and strength training (lifting groceries counts, right?)",
				"Maintaining a consistent sleep schedule (consistently ignoring it, that is).",
				"Practicing mindfulness and meditation, or just staring at the ceiling."
			]
		},
		personal: {
			title: "Personal Life",
			description: "What's keeping me busy outside of work (besides existential dread):",
			items: [
				"Planning upcoming travels (to the fridge and back).",
				"Learning a new skill: perfecting the art of procrastination.",
				"Spending time with family and friends, mostly convincing them I have a real job."
			]
		},
		upcoming: {
			title: "Upcoming Goals",
			description: "What I'm looking forward to (besides the weekend):",
			items: [
				"Launching new features for current projects (and hoping nothing breaks).",
				"Completing advanced certifications (so my LinkedIn looks cooler).",
				"Contributing more to the dev community, or at least retweeting smart people."
			]
		}
	};

	return (
		<MainContent>
			<section className="w-full md:w-1/2 flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<div className="flex flex-col items-start justify-start gap-2">
					<h1 className="text-2xl font-bold">So! Currently...</h1>
				</div>

				{Object.values(now).map((section, index) => {
					if (typeof section === 'string') return null;
					return (
						<div key={section.title} className="flex flex-col items-start justify-start gap-2 w-full">
							<h2 className="text-xl font-bold">{section.title}</h2>
							<p className="text-md text-foreground/80 mb-2">{section.description}</p>
							<ul className="list-disc list-inside space-y-1 ml-4">
								{section.items.map((item, idx) => (
									<li key={idx} className="text-md text-foreground/80 list-outside">{item}</li>
								))}
							</ul>
						</div>
					);
				})}

				<p className="text-sm text-foreground/50">Last Updated: {now.lastUpdated}</p>
				<p className="text-md text-foreground/80 mt-4">
					This page is inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline">nownownow.com</a>
				</p>
			</section>
		</MainContent>
	);
}