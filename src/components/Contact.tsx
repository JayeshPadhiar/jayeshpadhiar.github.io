import { useState } from "react";

export default function Contact() {

	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const sendEmail = async () => {
		try {
			const response = await fetch("/api/v1/send-email", {
				method: "POST",
				body: JSON.stringify({ email, subject, message }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await response.json();

			if (data.code === "EMAIL_SENT_SUCCESSFULLY") {
				alert("Email sent successfully");
				setEmail("");
				setSubject("");
				setMessage("");
			} else {
				alert(data.message);
				setEmail("");
				setSubject("");
				setMessage("");
			}
		} catch (error) {
			console.error(error);
		}
	}

	const contactDetails = [
		{
			icon: "fa-solid fa-envelope",
			link: "mailto:jayeshpadhiar20@gmail.com",
			label: "jayeshpadhiar20@gmail.com"
		},
		{
			icon: "fa-solid fa-phone",
			link: "tel:+917218194049",
			label: "+91-7218194049"
		},
		{
			icon: "fa-brands fa-linkedin",
			link: "https://www.linkedin.com/in/jayeshpadhiar/",
			label: "linkedin.com/in/jayeshpadhiar"
		}
	]
	return (
		<section id="contact" className="w-full flex flex-col md:flex-row items-start justify-start py-16 border-t-1 border-foreground/10 gap-8">
			<div className="flex flex-col items-start justify-start gap-4 w-full md:w-1/3 h-full">
				<h1 className="text-2xl font-bold">Contact</h1>
				<p className="text-sm text-foreground/80">
					Whether it's building something cool or exchanging ideas, I'm always open to a good conversation.
				</p>
				<div className="flex flex-col items-start justify-start gap-4 w-full mt-4">
					{contactDetails.map((contact) => (
						<a href={contact.link} target="_blank" rel="noopener noreferrer" key={contact.label} className="flex flex-row items-center justify-start gap-4 break-all">
							<i className={contact.icon}></i>
							<p className="text-sm text-foreground/80">{contact.label}</p>
						</a>
					))}
				</div>
			</div>

			<div className="w-[1px] h-full bg-foreground/10" />

			<div className="flex flex-col items-start justify-start gap-4 w-full md:w-2/3 h-full">
				<h1 className="text-2xl font-bold">Leave a message</h1>
				<div className="flex flex-col items-start justify-start gap-4 w-full">
					<input type="email" placeholder="Email" className="w-full h-10" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="text" placeholder="Subject" className="w-full h-10" value={subject} onChange={(e) => setSubject(e.target.value)} />
					<textarea placeholder="Message" className="w-full h-32" value={message} onChange={(e) => setMessage(e.target.value)} />
					<button className="bg-secondary-foreground text-background px-4 py-2 rounded-md" onClick={sendEmail}>Send</button>
				</div>
			</div>
		</section>
	);
}