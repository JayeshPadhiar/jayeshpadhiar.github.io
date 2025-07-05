export default function Experience({ experience }: { experience: any }) {

    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        timelineContainer: "w-full h-full flex flex-col items-start justify-start py-8",
        timelineItem: "w-full h-full flex flex-col items-start justify-start gap-4 border-l-1 border-foreground/20 pl-4 pb-4 relative",
        dot: "w-2 h-2 bg-foreground rounded-full absolute top-0 left-0 -translate-x-[55%] z-10",
        timelineItemDescriptionList: "text-sm text-foreground/50 list-disc list-outside flex flex-col gap-4 pl-4 gap-y-4",
        timelineItemPeriod: "text-sm text-foreground/50 font-bold",
        timelineItemCompany: "text-lg font-bold border-[0.5px] border-foreground/40 rounded-md px-4 py-1 w-fit",
        timelineItemTitle: "text-sm text-foreground/60 border-[0.5px] border-foreground/40 rounded-md px-2 py-1 w-fit",
        timelineItemDescription: "text-sm text-foreground/80",
    }
    return (
        <section id="experience" className={styles.container}>
            <h1 className={styles.title}>Experience</h1>
            <div className={styles.timelineContainer}>
                {experience.map((exp: any, index: number) => (
                    <div className={styles.timelineItem} key={index}>
                        <div className={styles.dot}></div>
                        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                            <h1 className={styles.timelineItemCompany}>{exp.company}</h1>
                            <span className="text-xs text-foreground/40">{exp.location}</span>
                        </div>
                        <div className="w-full h-full flex flex-col items-start justify-start gap-4">
                            {exp.roles.map((role: any, index: number) => (
                                <div className="w-full h-full flex flex-col items-start justify-start gap-2" key={index}>
                                    <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                        <h3 className={styles.timelineItemTitle}>{role.title}</h3>
                                        <h3 className={styles.timelineItemPeriod}>{role.period}</h3>
                                    </div>
                                    <ul className={styles.timelineItemDescriptionList}>
                                        {role.description.map((desc: any, idx: number) => (
                                            <li className={styles.timelineItemDescription} key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}