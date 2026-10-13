export default function MainContent({ children }: { children: React.ReactNode }) {
	return (
		<main id="main" className="w-full flex flex-col items-start justify-start px-8 md:px-16">
			{children}
		</main>
	);
}
