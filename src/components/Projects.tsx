import GitHubCalendar from "react-github-calendar";
import { FaArrowRight } from "react-icons/fa";

export default function Projects() {
    const gitHubCalendarTheme = {
        dark: ['lightgrey', 'green']
    }
    return (
        <section id="projects" className="w-full flex flex-col items-start justify-start gap-4 px-8 py-16 border-t-1 border-foreground/10">
            <h1 className="text-2xl font-bold">Projects</h1>

            <div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
                <ProjectCard title="Project 1" description="Description of project 1" />
                <ProjectCard title="Project 2" description="Description of project 2" />
            </div>
            <a href="https://github.com/jayeshpadhiar?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-foreground/80">View All Projects <span><FaArrowRight /></span></a>
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

const ProjectCard = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="w-1/3 min-w-[300px] max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-8 border-1 border-foreground/20 cursor-pointer" style={{ borderRadius: "10px" }}>
            <h1>{title}</h1>
            <p className="text-sm text-foreground/60">{description}</p>
            <a href={'#lol'} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-foreground/80">View Project <span><FaArrowRight /></span></a>
        </div>
    )
}