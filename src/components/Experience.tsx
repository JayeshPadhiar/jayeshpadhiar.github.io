export default function Experience() {

    const experience = [
        {
            id: 1,
            company: "Jio",
            title: "Fullstack Web Developer (SDE-1)",
            location: "Mumbai, MH",
            sections: [
                {
                    id: 1,
                    period: "July 2022 — Present",
                    title: "Fullstack Web Developer (SDE-1)",
                    description: [
                        "Developed 30+ scalable PWAs using MEAN & MERN Stack, enhancing security with JWT authentication.",
                        "Extensively used GraphQL & RxJS for optimizing API integration for over 10 engagements.",
                        "Led full-stack development for a responsive B2B and B2C home website with 50k+ visitors (JioEngage & JioCoupons), including a CMS dashboard for dynamic content management.",
                        "Used Redis & RabbitMQ for multiple backend/frontend projects of JioCinema, scaling over 40k users.",
                        "Implemented real-time communication with sockets for multiple apps, achieving 1k+ concurrent users.",
                        "Used Docker for deploying 10+ containerized applications and orchestrated microservices with Kubernetes on GCP.",
                        "Integrated CI/CD pipelines to automate build, test, and deployment workflows, reducing deployment time by 30%.",
                        "Built a cross-browser JavaScript extension for JioCloud, reducing bandwidth latency by 40% and enhancing media streaming.",
                        "Upgraded the entire codebase from Angular 8 to Angular 14, improving performance & maintainability.",
                        "Mentored 5+ junior developers, conducted KT sessions, and implemented Agile practices to improve team productivity."
                    ]
                }
            ]
        },
        {
            id: 2,
            company: "Eshopbox",
            title: "Fullstack Web Developer (Freelance)",
            location: "Pune, MH",
            sections: [
                {
                    id: 1,
                    period: "Jan 2021 - July 2021",
                    title: "Fullstack Web Developer (Freelance)",
                    description: [
                        "Built a customer portal from scratch using MongoDB, Express, Angular & Node.js.",
                        "Boosted performance by 20% using modular development, efficient schema, and seamless client-server integration."
                    ]
                }
            ]
        }
    ]


    const styles = {
        container: "w-full flex flex-col items-start justify-start gap-4 px-8 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        timelineContainer: "w-full h-full flex flex-col items-start justify-start py-8",
        timelineItem: "w-full h-full flex flex-col items-start justify-start gap-1 border-l-1 border-foreground/20 pl-4 pb-4 relative",
        dot: "w-2 h-2 bg-foreground rounded-full absolute top-0 left-0 -translate-x-[55%] z-10",
        timelineItemDescriptionList: "text-sm text-foreground/50 list-disc list-outside flex flex-col gap-4 pl-4 mt-4 gap-y-4",
        timelineItemPeriod: "text-sm text-foreground/50 font-bold",
        timelineItemCompany: "text-lg font-bold border-[0.5px] border-foreground/40 rounded-md px-4 py-1 w-fit",
        timelineItemTitle: "text-sm text-foreground/60 border-[0.5px] border-foreground/40 rounded-md px-2 py-1 w-fit",
        timelineItemDescription: "text-sm text-foreground/80",
    }
    return (
        <section id="experience" className={styles.container}>
            <h1 className={styles.title}>Experience</h1>
            <div className={styles.timelineContainer}>
                {experience.map((exp) => (
                    <div className={styles.timelineItem} key={exp.id}>
                        <div className={styles.dot}></div>
                        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                            <h1 className={styles.timelineItemCompany}>{exp.company}</h1>
                            <span className="text-xs text-foreground/40">{exp.location}</span>
                        </div>
                        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
                            {exp.sections.map((section) => (
                                <div className="w-full h-full flex flex-col items-start justify-start gap-2" key={section.id}>
                                    <div className="w-full h-full flex flex-row items-center justify-between gap-2">
                                        <h3 className={styles.timelineItemTitle}>{section.title}</h3>
                                        <h3 className={styles.timelineItemPeriod}>{section.period}</h3>
                                    </div>
                                    <ul className={styles.timelineItemDescriptionList}>
                                        {section.description.map((desc, idx) => (
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