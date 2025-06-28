export default function About() {
    const contentArray = [{
        id: 1,
        content: "I'm a full-stack developer with a focus on building reliable, scalable web applications. I've worked on high-traffic platforms, real-time systems, and internal tools — mostly using JavaScript, TypeScript, Angular, React, and Node.js. I enjoy being part of teams where code meets real-world impact, and where things are built with care."
    }, {
        id: 2,
        content: "Outside of work, I like making side projects that solve small, interesting problems — whether it's automating a task, experimenting with design, or just learning something new. I enjoy working across the stack, especially when I get to keep things simple, fast, and intuitive."
    }, {
        id: 3,
        content: "When I'm not at my desk, you'll probably find me in the mountains, reading something existential, or watching/playing football. I like quiet challenges — whether it's climbing a peak, finishing a long book, or just trying to get better at what I do without rushing the process."
    },
    {
        id: 4,
        content: "That's me, mostly...the rest changes with the next idea."
    }
];

    return (
        <section id="about" className="w-full flex flex-col items-start justify-start gap-8 px-8 py-16 border-t-1 border-foreground/10">
            <h1 className="text-2xl font-bold">About</h1>
            {contentArray.map((content) => (
                <p className="text-md text-foreground/80" key={content.id}>
                    {content.content}
                </p>
            ))}
        </section>
    );
}