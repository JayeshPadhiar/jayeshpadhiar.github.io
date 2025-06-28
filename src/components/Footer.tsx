import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const styles = {
		container: "w-full flex flex-col items-start justify-start gap-4 px-8 py-4 border-t-1 border-foreground/10",
		copyright: "text-sm text-foreground/80",
		socialContainer: "flex flex-row items-center justify-center gap-8 flex-wrap",
		iconLink: "cursor-pointer hover:text-secondary-foreground transition-colors duration-300",
		icon: "w-6 h-6"
	};

	return (
		<footer className={styles.container}>
			<div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
				<p className={styles.copyright}>
					© {currentYear} Jayesh Padhiar. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
