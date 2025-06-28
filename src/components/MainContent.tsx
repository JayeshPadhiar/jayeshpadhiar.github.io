export default function MainContent({ children }: { children: React.ReactNode }) {
	return (
		<main className="w-full md:h-full flex flex-col items-start justify-start md:overflow-auto" style={{ scrollBehavior: "smooth" }}>
			{children}
		</main>
	);
}