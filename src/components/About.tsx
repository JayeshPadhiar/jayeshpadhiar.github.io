import home from "@/static/home.json";

export default function About() {
    const about = home.about;

    return (
        <section id="about" className="w-full flex flex-col items-start justify-start gap-8 py-16">
            <h1 className="text-2xl font-bold">About</h1>
            {about.map((content: string, index: number) => (
                <p className="text-md text-foreground/80" key={index}>
                    {content}
                </p>
            ))}
        </section>
    );
}