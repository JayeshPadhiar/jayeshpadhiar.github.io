export default function Skills({ skills }: { skills: any }) {
    
    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-8 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        subTitle: "text-lg font-bold",
        skill: "text-sm border-1 border-foreground/10 rounded-full md:px-4 px-2 py-1 w-fit transition-all duration-300 cursor-default",
        skillContainer: "flex flex-col items-start justify-start gap-4 w-full",
        skillList: "flex flex-row items-start justify-start gap-2 flex-wrap w-full",
    }
    
    return (
        <section id="skills" className={styles.container}>
            <h1 className={styles.title}>Skills</h1>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-y-16 md:gap-x-8 gap-y-8 w-full">
                {skills.map((skill: { title: string, skills: string[], icon: string }, index: number) => (
                    <div className={styles.skillContainer} key={index}> 
                        <div className="flex flex-row items-center justify-start gap-2 w-full">
                            <h2 className={styles.subTitle}>{skill.title}</h2>
                            <i className={`${skill.icon}`}></i>
                        </div>
                        <div className={styles.skillList}>
                            {skill.skills.map((skill: string) => (
                                <div className={styles.skill} key={skill}>{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}