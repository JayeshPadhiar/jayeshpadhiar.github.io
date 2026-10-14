import type { Project } from "@/lib/content";

// Open-source / GitHub projects. Hidden while `projects.visible` is false in home.json;
// set it to true (and edit `items`) to show the section again.
export default function Projects({ projects }: { projects: { visible: boolean; items: Project[] } }) {
	if (!projects.visible || projects.items.length === 0) return null;

	return (
		<section id="projects" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-border">
			<h2 className="text-2xl font-bold">Projects</h2>
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{projects.items.map((project) => (
					<ProjectCard key={project.url} title={project.title} description={project.description} url={project.url} />
				))}
			</div>
			<a href="https://github.com/jayeshpadhiar?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-muted">
				View All Projects
				<span>
					<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
				</span>
			</a>
		</section>
	);
}

const ProjectCard = ({ title, description, url }: Project) => {
	return (
		<div className="w-full md:w-1/3 md:min-w-[300px] md:max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-4 border-1 border-border rounded-lg self-stretch">
			<h3>{title}</h3>
			<p className="text-sm text-muted">{description}</p>
			<a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-muted mt-auto hover:underline">
				View Project
				<span>
					<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
				</span>
			</a>
		</div>
	);
};
