import { FaCode, FaDatabase, FaLanguage, FaServer, FaTools } from "react-icons/fa";

export default function Skills() {
    const skills = [
        {
            id: 1,
            icon: <FaLanguage />,
            title: "Languages",
            skills: ["JavaScript", "TypeScript", "Python", "HTML5"]
        },
        {
            id: 2,
            icon: <FaDatabase />,
            title: "Databases",
            skills: ["MongoDB", "SQL", "Redis", "GraphQL"]
        },
        {
            id: 3,
            icon: <FaCode />,
            title: "Frontend",
            skills: ["Angular", "React", "Next.js", "Tailwind CSS", "Bootstrap"]
        },
        {
            id: 4,
            icon: <FaServer />,
            title: "Backend",
            skills: ["Node.js", "Express", "Socket.IO", "RabbitMQ"]
        },
        {
            id: 5,
            icon: <FaTools />,
            title: "Tools & Platforms",
            skills: ["Git", "Docker", "Postman", "GCP", "AWS", "Figma"]
        },
    ]   
    
    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-8 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        subTitle: "text-lg font-bold",
        skill: "text-sm border-1 border-foreground/10 rounded-full md:px-4 px-2 py-1 w-fit transition-all duration-300 cursor-default",
        skillContainer: "flex flex-col items-start justify-start gap-4 w-full",
        skillList: "flex flex-row items-start justify-start gap-2 flex-wrap w-full",
        skillIcon: "w-5 h-5 text-foreground flex items-center justify-center",
    }
    
    return (
        <section id="skills" className={styles.container}>
            <h1 className={styles.title}>Skills</h1>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-y-16 md:gap-x-8 gap-y-8 w-full">

                {skills.map((skill) => (
                    <div className={styles.skillContainer} key={skill.id}>
                        <div className="flex flex-row items-center justify-start gap-2 w-full">
                            <h2 className={styles.subTitle}>{skill.title}</h2>
                            <div className={styles.skillIcon}>{skill.icon}</div>
                        </div>
                        <div className={styles.skillList}>
                            {skill.skills.map((skill) => (
                                <div className={styles.skill} key={skill}>{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}