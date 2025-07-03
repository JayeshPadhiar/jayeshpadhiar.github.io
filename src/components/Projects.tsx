import GitHubCalendar from "react-github-calendar";
import home from "@/static/home.json";

export default function Projects() {
	const projects = home.projects.featured;
	const gitHubCalendarTheme = {
		dark: ['lightgrey', 'green']
	};

	return (
		<section id="projects" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10">
			<h1 className="text-2xl font-bold">Projects</h1>

			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{projects.map((project: { title: string, description: string, url: string }, idx: number) => (
					<ProjectCard key={idx} title={project.title} description={project.description} url={project.url} />
				))}
			</div>
			<a href="https://github.com/jayeshpadhiar?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-foreground/80">
				View All Projects
				<span>
					<i className={`fa-solid fa-arrow-right`}></i>
				</span>
			</a>
			<div className="w-full flex flex-col items-start justify-start gap-4 mt-8">
				<h2 className="text-lg font-semibold">Contribution Activity</h2>
				<GitHubCalendar
					theme={gitHubCalendarTheme}
					username="jayeshpadhiar"
					blockSize={10}
					fontSize={12}
					style={{ width: '100%' }}
				/>
			</div>
		</section>
	)
}

const ProjectCard = ({ title, description, url }: { title: string, description: string, url: string }) => {
	return (
		<div className="w-full md:w-1/3 md:min-w-[300px] md:max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-4 border-1 border-foreground/20 cursor-pointer" style={{ borderRadius: "10px", alignSelf: "stretch" }}>
			<h1>{title}</h1>
			<p className="text-sm text-foreground/60">{description}</p>
			<a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-foreground/80 mt-auto hover:underline">
				View Project
				<span>
					<i className={`fa-solid fa-arrow-right`}></i>
				</span>
			</a>
		</div>
	)
}