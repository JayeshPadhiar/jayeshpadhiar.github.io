import MainContent from "@/components/MainContent";

export default function Now() {
	const now = {
		lastUpdated: "March 2024",
		currentWork: {
			title: "Current Work",
			description: "Working as a Fullstack Developer at Jio, focusing on:",
			items: [
				"Building and maintaining high-traffic web applications",
				"Leading frontend development for B2B/B2C platforms",
				"Optimizing backend services and API performance",
			]
		},
		sideProjects: {
			title: "Side Projects",
			description: "Currently building and experimenting with:",
			items: [
				"Personal portfolio website using Next.js and TypeScript",
				"Contributing to open-source projects",
				"Exploring new web technologies and frameworks"
			]
		},
		learning: {
			title: "Learning",
			description: "Currently expanding my knowledge in:",
			items: [
				"System Design and Architecture",
				"Cloud Native Technologies",
				"Advanced TypeScript Patterns"
			]
		},
		reading: {
			title: "Reading",
			description: "Books I'm currently reading:",
			items: [
				"Technical: [Book Title]",
				"Non-Fiction: [Book Title]",
				"Fiction: [Book Title]"
			]
		},
		health: {
			title: "Health & Habits",
			description: "Current focus areas:",
			items: [
				"Regular exercise and strength training",
				"Maintaining a consistent sleep schedule",
				"Practicing mindfulness and meditation"
			]
		},
		personal: {
			title: "Personal Life",
			description: "What's keeping me busy outside of work:",
			items: [
				"Planning upcoming travels",
				"Learning a new skill",
				"Spending time with family and friends"
			]
		},
		upcoming: {
			title: "Upcoming Goals",
			description: "What I'm looking forward to:",
			items: [
				"Launching new features for current projects",
				"Completing advanced certifications",
				"Contributing more to the dev community"
			]
		}
	};

	return (
		<MainContent>
			<section className="w-full flex flex-col items-start justify-start gap-8 px-8 py-16">
				<div className="flex flex-col items-start justify-start gap-2">
					<h1 className="text-2xl font-bold">Now</h1>
					<p className="text-sm text-foreground/50">Last Updated: {now.lastUpdated}</p>
					<p className="text-md text-foreground/80 mt-4">
						A snapshot of what I'm currently focused on, inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline">nownownow.com</a>
					</p>
				</div>

				{Object.values(now).map((section, index) => {
					if (typeof section === 'string') return null;
					return (
						<div key={section.title} className="flex flex-col items-start justify-start gap-4 w-full">
							<h2 className="text-xl font-bold">{section.title}</h2>
							<p className="text-md text-foreground/80">{section.description}</p>
							<ul className="list-disc list-inside space-y-2">
								{section.items.map((item, idx) => (
									<li key={idx} className="text-md text-foreground/80">{item}</li>
								))}
							</ul>
						</div>
					);
				})}
			</section>
		</MainContent>
	);
}