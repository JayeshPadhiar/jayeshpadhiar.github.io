export default function About({ about }: { about: string[] }) {
    return (
        <section id="about" className="w-full flex flex-col items-start justify-start gap-8 py-16">
            <h2 className="text-2xl font-bold">About</h2>
            {about.map((content, index) => (
                <p className="text-md text-muted" key={index}>
                    {content}
                </p>
            ))}
        </section>
    );
}
