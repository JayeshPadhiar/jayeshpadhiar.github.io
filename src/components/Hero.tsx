import Image from "next/image";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt, FaQuestion } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="hero" className="w-full md:w-[32%] md:h-full h-screen flex flex-col items-center justify-center p-8 text-center">
      <Image src="/images/profile.jpeg" className="rounded-full aspect-square object-cover" alt="Profile" width={140} height={140} />
      <h1 className="text-4xl md:text-2xl font-bold mt-4">Jayesh Padhiar</h1>
      <p className="text-2xl md:text-sm text-foreground/80 mt-2">Fullstack Developer</p>
      <div className="w-1/5 h-[0.5px] bg-foreground/50 my-4"></div>
      <p className="text-md md:text-sm text-foreground/80 mb-8">
        I create reliable, user-focused web solutions, driven by a passion for meaningful code, innovative side projects, and quiet pursuits like hiking peaks, diving into deep reads, and breathing football.
      </p>
      <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
        <a href="https://linkedin.com/in/jayeshpadhiar" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-secondary-foreground" />
        </a>
        <a href="https://github.com/jayeshpadhiar" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-6 h-6 cursor-pointer hover:text-secondary-foreground" />
        </a>
        <a href="mailto:jayeshpadhiar20@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope className="w-6 h-6 cursor-pointer hover:text-secondary-foreground" />
        </a>
        <a href="tel:+917218194049" target="_blank" rel="noopener noreferrer">
          <FaPhoneAlt className="w-6 h-6 cursor-pointer hover:text-secondary-foreground" />
        </a>
      </div>
      <div className="flex gap-4 mt-6">
        <a href="/files/Jayesh_Padhiar_Resume.pdf" target="_blank" rel="noopener noreferrer">
          <button className="bg-secondary-foreground text-background px-6 py-2 rounded-md hover:bg-secondary-foreground/90 transition-colors duration-200">Resume</button>
        </a>
        <a href="/now">
          <button className="bg-secondary-foreground text-background px-6 py-2 rounded-md hover:bg-secondary-foreground/90 transition-colors duration-200">Currently, I'm...</button>
        </a>
      </div>
    </section>
  );
}   