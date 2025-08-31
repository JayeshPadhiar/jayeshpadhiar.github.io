"use client";
import { useState, useEffect } from "react";
import HeroSettings from "./components/HeroSettings";
import AboutSettings from "./components/AboutSettings";
import SkillSettings from "./components/SkillSettings";
import ExperienceSettings from "./components/ExperienceSettings";
import ProjectSettings from "./components/ProjectSettings";
import BookSettings from "./components/BookSettings";
import BlogSettings from "./components/BlogSettings";
import { useRouter } from "next/navigation";
import NowSettings from "./components/NowSettings";

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
	const [books, setBooks] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [now, setNow] = useState([]);

	async function selectPage(page: any) {
		setSelectedPage(page);
		setLoading(true);

		const response = await fetch(`/api/v1/${page.toLowerCase()}`).then(res => res.json());
		if (page === "Home") {
			setHero(response?.hero);
			setAbout(response?.about);
			setSkills(response?.skills);
			setExperience(response?.experience);
			setProjects(response?.projects);
		} else if (page === "Books") {
			setBooks(response?.books);
		} else if (page === "Blogs") {
			setBlogs(response?.blogs);
		} else if (page === "Now") {
			setNow(response?.now);
		}
		setLoading(false);
	}

	const update = async () => {
		let updatedData: any;
		if (selectedPage === "Home") {
			updatedData = {
				hero,
				about,
				skills,
				experience,
				projects,
			}
		} else if (selectedPage === "Books") {
			updatedData = books;
		} else if (selectedPage === "Blogs") {
			updatedData = blogs;
		} else {
			updatedData = now;
		}
		const response = await fetch(`/api/v1/${selectedPage.toLowerCase()}`, {
			method: "POST",
			body: JSON.stringify(updatedData),
		});
		const data = await response.json();
		if (data.success) {
			alert("Data updated successfully");
			selectPage(selectedPage);
		} else {
			alert(data.message);
		}
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
		<div className="flex md:flex-row flex-col w-full h-full md:gap-4 gap-0">
			<div className="flex flex-col md:w-[25%] w-full h-full p-8 justify-start items-center">
				<h1 className="text-2xl font-bold">Admin</h1>
				<div className="flex md:flex-col flex-row w-full h-full gap-2 mt-4 items-center">
					{["Home", "Blogs", "Books", "Now"].map((page) => (
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
							<BookSettings books={books} setBooks={setBooks} />
						</div>
					)}
					{selectedPage === "Blogs" && !loading && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
							<BlogSettings blogs={blogs} setBlogs={setBlogs} />
						</div>
					)}
					{selectedPage === "Now" && !loading && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
							<NowSettings now={now} setNow={setNow} />
						</div>
					)}
				</div>
				<button className="flex justify-center items-center w-[100px] h-12 py-4 bg-foreground/10 rounded-full ml-auto" onClick={update}>Update</button>
			</div>
		</div>
	);
}