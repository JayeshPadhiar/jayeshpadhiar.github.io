"use client";
import { useSyncExternalStore } from "react";
import GitHubCalendar, { type Activity } from "react-github-calendar";

// Empty-day color to busiest-day color; the library interpolates between them.
const theme = {
	light: ["#ebebeb", "#147a3a"],
	dark: ["#262626", "#4ade80"],
};

const SHOWN_MONTHS = 6;

const selectLastHalfYear = (contributions: Activity[]) => {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();

	return contributions.filter((activity) => {
		const date = new Date(activity.date);
		const monthOfDay = date.getMonth();

		return (
			date.getFullYear() === currentYear &&
			monthOfDay > currentMonth - SHOWN_MONTHS &&
			monthOfDay <= currentMonth
		);
	});
};

// The library defaults to the OS color scheme, so follow the site's own toggle (<html data-theme>) instead.
const subscribeToTheme = (onChange: () => void) => {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
	return () => observer.disconnect();
};
const getTheme = (): "light" | "dark" => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
const getServerTheme = (): "light" | "dark" => "light";

export default function ContributionCalendar() {
	const colorScheme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

	return (
		<GitHubCalendar
			theme={theme}
			colorScheme={colorScheme}
			username="jayeshpadhiar"
			blockSize={10}
			fontSize={12}
			style={{ width: "100%", scrollbarWidth: "none" }}
			showWeekdayLabels={true}
			blockRadius={4}
			transformData={selectLastHalfYear}
			labels={{
				totalCount: "{{count}} contributions in the last 6 months",
			}}
		/>
	);
}
