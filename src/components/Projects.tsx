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
                <ProjectCard title="Resume Analyzer" description="An open-source Resume Analyzer and Ranking tool for recruiters and candidates." url="https://github.com/Yashdew/Assessor" />
                <ProjectCard title="Customer Portal" description="AnjularJS based freelance project designed for companies to provide a solution to the users to create and update profile settings." url="https://github.com/JayeshPadhiar/CustomerPortal" />
                <ProjectCard title="Cowin Booking Automation" description="A Python Script to automate searching of available vaccination centers in the city and hence booking." url="https://github.com/JayeshPadhiar/CowinVaccineScheduler" />
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

const ProjectCard = ({ title, description, url }: { title: string, description: string, url: string }) => {
    return (
        <div className="w-1/3 min-w-[300px] max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-4 border-1 border-foreground/20 cursor-pointer align-self-stretch" style={{ borderRadius: "10px" }}>
            <h1>{title}</h1>
            <p className="text-sm text-foreground/60">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-foreground/80 mt-auto">View Project <span><FaArrowRight /></span></a>
        </div>
    )
}