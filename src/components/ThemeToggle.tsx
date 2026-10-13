"use client";

// The icon shown is chosen in CSS from <html data-theme>, so this needs no React state.
export default function ThemeToggle() {
	const toggle = () => {
		const root = document.documentElement;
		const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
		root.setAttribute("data-theme", next);
		try {
			localStorage.setItem("theme", next);
		} catch {
			// Storage can be blocked; the toggle still works for this visit.
		}
	};

	return (
		<button type="button" onClick={toggle} aria-label="Toggle light/dark theme" className="theme-toggle cursor-pointer px-2 py-1 mr-2">
			<i className="fa-solid fa-sun theme-icon-sun" aria-hidden="true"></i>
			<i className="fa-solid fa-moon theme-icon-moon" aria-hidden="true"></i>
		</button>
	);
}
