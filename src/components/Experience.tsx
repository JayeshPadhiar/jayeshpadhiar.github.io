import type { ExperienceEntry } from "@/lib/content";

export default function Experience({ experience }: { experience: ExperienceEntry[] }) {

    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-border",
        title: "text-2xl font-bold",
        timelineContainer: "w-full h-full flex flex-col items-start justify-start py-8",
        timelineItem: "w-full h-full flex flex-col items-start justify-start gap-4 border-l-1 border-border pl-4 pb-4 relative",
        dot: "w-2 h-2 bg-foreground rounded-full absolute top-0 left-0 -translate-x-[55%] z-10",
        timelineItemDescriptionList: "text-sm text-subtle list-disc list-outside flex flex-col gap-4 pl-4 gap-y-4",
        timelineItemPeriod: "text-sm text-subtle font-bold",
        timelineItemCompany: "text-lg font-bold border-[0.5px] border-border-strong rounded-md px-4 py-1 w-fit",
        timelineItemTitle: "text-sm text-muted border-[0.5px] border-border-strong rounded-md px-2 py-1 w-fit",
        timelineItemDescription: "text-sm text-muted",
    }
    return (
        <section id="experience" className={styles.container}>
            <h2 className={styles.title}>Experience</h2>
            <div className={styles.timelineContainer}>
                {experience.map((exp) => (
                    <div className={styles.timelineItem} key={exp.company}>
                        <div className={styles.dot}></div>
                        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                            <h3 className={styles.timelineItemCompany}>{exp.company}</h3>
                            <span className="text-xs text-subtle">{exp.location}</span>
                        </div>
                        <div className="w-full h-full flex flex-col items-start justify-start gap-4">
                            {exp.roles.map((role) => (
                                <div className="w-full h-full flex flex-col items-start justify-start gap-2" key={`${role.title}-${role.period}`}>
                                    <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                        <h4 className={styles.timelineItemTitle}>{role.title}</h4>
                                        <p className={styles.timelineItemPeriod}>{role.period}</p>
                                    </div>
                                    <ul className={styles.timelineItemDescriptionList}>
                                        {role.description.map((desc, idx) => (
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
