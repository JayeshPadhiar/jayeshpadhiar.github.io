export default function Contact() {
    return (
        <section id="contact" className="w-full flex flex-col items-start justify-start gap-4 px-8 py-16 border-t-1 border-foreground/10">
            <h1 className="text-2xl font-bold">Contact</h1>
            <p className="text-sm text-foreground/80">
                I'm always looking for new opportunities and collaborations.
                <br />
                Let's get in touch!
            </p>
            <div className="flex flex-col items-start justify-start gap-4 w-full">
                <input type="email" placeholder="Email" className="w-full h-10" />
                <input type="text" placeholder="Subject" className="w-full h-10" />
                <textarea placeholder="Message" className="w-full h-32" />
                <button className="bg-secondary-foreground text-background px-4 py-2 rounded-md" disabled={true}>Send</button>
            </div>
        </section>
    );
}