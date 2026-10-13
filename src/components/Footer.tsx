const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full flex flex-col items-start justify-start gap-4 py-4 border-t-1 border-border">
			<div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-sm text-muted">
					© {currentYear} Jayesh Padhiar. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
