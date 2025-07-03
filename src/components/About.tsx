import home from "@/static/home.json";

export default function About() {
    const aboutData = home.about;
    const contentArray = aboutData.sections;

    return (
        <section id="about" className="w-full flex flex-col items-start justify-start gap-8 py-16">
            <h1 className="text-2xl font-bold">About</h1>
            {contentArray.map((section: { id: number, content: string }, index: number) => (
                <p className="text-md text-foreground/80" key={index}>
                    {section.content}
                </p>
            ))}
        </section>
    );
}