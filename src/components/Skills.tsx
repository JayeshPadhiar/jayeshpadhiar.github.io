import type { Skill } from "@/lib/content";

export default function Skills({ skills }: { skills: Skill[] }) {

    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-8 py-16 border-t-1 border-border",
        title: "text-2xl font-bold",
        subTitle: "text-lg font-bold",
        skill: "text-sm border-1 border-border rounded-full md:px-4 px-2 py-1 w-fit transition-all duration-300 cursor-default",
        skillContainer: "flex flex-col items-start justify-start gap-4 w-full",
        skillList: "flex flex-row items-start justify-start gap-2 flex-wrap w-full",
    }

    return (
        <section id="skills" className={styles.container}>
            <h2 className={styles.title}>Skills</h2>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-y-16 md:gap-x-8 gap-y-8 w-full">
                {skills.map((category) => (
                    <div className={styles.skillContainer} key={category.title}>
                        <div className="flex flex-row items-center justify-start gap-2 w-full">
                            <h3 className={styles.subTitle}>{category.title}</h3>
                            <i className={category.icon} aria-hidden="true"></i>
                        </div>
                        <ul className={styles.skillList}>
                            {category.skills.map((skill) => (
                                <li className={styles.skill} key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
