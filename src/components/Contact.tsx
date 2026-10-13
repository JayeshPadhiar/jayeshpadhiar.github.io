export default function Contact() {

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
		<section id="contact" className="w-full flex flex-col items-start justify-start py-16 border-t-1 border-border gap-8">
			<div className="flex flex-col items-start justify-start gap-4 w-full h-full">
				<h2 className="text-2xl font-bold">Contact</h2>
				<p className="text-sm text-muted">
					Whether it&apos;s building something cool or exchanging ideas, I&apos;m always open to a good conversation.
				</p>
				<div className="flex flex-col items-start justify-start gap-4 w-full mt-4">
					{contactDetails.map((contact) => (
						<a href={contact.link} target="_blank" rel="noopener noreferrer" key={contact.label} className="flex flex-row items-center justify-start gap-4 break-all">
							<i className={contact.icon} aria-hidden="true"></i>
							<p className="text-sm text-muted">{contact.label}</p>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
