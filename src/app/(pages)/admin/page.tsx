"use client";
import { useState, useEffect } from "react";
import HeroSettings from "./components/HeroSettings";
import AboutSettings from "./components/AboutSettings";
import SkillSettings from "./components/SkillSettings";
import ExperienceSettings from "./components/ExperienceSettings";
import ProjectSettings from "./components/ProjectSettings";
import { useRouter } from "next/navigation";

export default function AdminPage() {
	const router = useRouter();

	const [token, setToken] = useState<string | null>(null);
	const [selectedPage, setSelectedPage] = useState("Home");
	const [loading, setLoading] = useState(true);

	const [hero, setHero] = useState({});
	const [about, setAbout] = useState([]);
	const [skills, setSkills] = useState({});
	const [experience, setExperience] = useState({});
	const [projects, setProjects] = useState({});

	function selectPage(page: any) {
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
				setLoading(false);
			});
	}

	function update() {
		const updatedData = {
			hero,
			about,
			skills,
			experience,
			projects,
		}
		console.log(updatedData);
		fetch(`/api/v1/home`, {
			method: "PUT",
			body: JSON.stringify(updatedData),
		}).then(res => res.json()).then(data => {
			console.log(data);
		});
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			return;
		}
		setToken(token);
		selectPage(selectedPage);
	}, [selectedPage]);

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
				<button className="flex justify-center items-center w-[100px] h-12 py-4 bg-foreground/10 rounded-full ml-auto" onClick={update}>Update</button>
			</div>
		</div>
	);
}