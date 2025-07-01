export default function MainContent({ children }: { children: React.ReactNode }) {
	return (
		<main className="w-full md:h-full flex flex-col items-start justify-start md:overflow-auto px-8 md:px-16" style={{ scrollBehavior: "smooth" }}>
			{children}
		</main>
	);
}