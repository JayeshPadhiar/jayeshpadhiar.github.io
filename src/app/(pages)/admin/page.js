// this page is for the admin to edit the homepage sections, books and now page
// this page consists of 3 sections on the left side of the page
// 1. Homepage Sections
// 2. Books
// 3. Now

// on the right side of the page, there will be a form to edit the selected page data

"use client";
import { useState, useEffect } from "react";
import HeroSettings from "./components/HeroSettings";
import AboutSettings from "./components/AboutSettings";
import SkillSettings from "./components/SkillSettings";
import ExperienceSettings from "./components/ExperienceSettings";
import ProjectSettings from "./components/ProjectSettings";

export default function AdminPage() {
	const [selectedPage, setSelectedPage] = useState("Home");

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const [hero, setHero] = useState({});
	const [about, setAbout] = useState([]);
	const [skills, setSkills] = useState({});
	const [experience, setExperience] = useState({});
	const [projects, setProjects] = useState({});

	function selectPage(page) {
		setSelectedPage(page);
		setLoading(true);
		fetch(`/api/v1/${page.toLowerCase()}`)
			.then(res => res.json())
			.then(data => {
				setHero(data?.hero);
				setAbout(data?.about);
				setSkills(data?.skills);
				setExperience(data?.experience);
				setProjects(data?.projects);
				setData(data);
				setLoading(false);
			});
	}

	useEffect(() => {
		selectPage(selectedPage);
	}, [selectedPage]);

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
	}


	return (
		<div className="flex flex-row w-full h-full gap-4">
			<div className="flex flex-col w-[25%] h-full p-8 justify-start items-center">
				<h1 className="text-2xl font-bold">Admin</h1>
				<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
					{["Home", "Books", "Now"].map((page) => (
						<div key={page} className={`flex justify-center items-center w-full h-12 py-4 rounded-full cursor-pointer ${selectedPage === page ? "border-1 border-foreground/80" : "border-1 border-foreground/10"}`}
							onClick={() => setSelectedPage(page)}>
							<h1 className="text-sm font-bold">{page}</h1>
						</div>
					))}
				</div>
			</div>

			<div className="h-full w-[2px] bg-foreground/10"></div>

			<div className="flex flex-col w-full h-full p-8 gap-4">
				<h1 className="text-2xl font-bold text-center">{selectedPage} Settings</h1>
				<div className="flex flex-col w-full h-full gap-4 items-center overflow-y-auto p-2">

					{/* Home */}
					{selectedPage === "Home" && !loading && (
						<form className="flex flex-col w-full h-full gap-4 items-center">
							<HeroSettings hero={hero} setHero={setHero} />
							<AboutSettings about={about} setAbout={setAbout} />
							<SkillSettings skills={skills} setSkills={setSkills} />
							<ExperienceSettings experience={experience} setExperience={setExperience} />
							<ProjectSettings projects={projects} setProjects={setProjects} />
						</form>
					)}
					{selectedPage === "Books" && !loading && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">

						</div>
					)}
					{selectedPage === "Now" && !loading && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
						</div>
					)}
				</div>
				<button className="flex justify-center items-center w-[100px] h-12 py-4 bg-foreground/10 rounded-full ml-auto" onClick={() => {
					console.log(hero);
					console.log(about);
					console.log(skills);
					console.log(experience);
					console.log(projects);
				}}>Save</button>
			</div>
		</div>
	);
}