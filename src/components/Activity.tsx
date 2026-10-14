import ContributionCalendar from "./ContributionCalendar";

export default function Activity() {
	return (
		<section id="activity" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-border">
			<h2 className="text-2xl font-bold">GitHub Activity</h2>
			<ContributionCalendar />
		</section>
	);
}
