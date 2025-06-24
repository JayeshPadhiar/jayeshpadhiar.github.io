import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Interests from "@/components/Interests";
//import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row items-start justify-start">
      <Hero />
      <div className="w-[0.5px] h-full bg-foreground"></div>
      <MainContent>
        <About />
        <Skills />
        <Experience />
        {/*<Projects />*/}
        <Interests />
        <Contact />
      </MainContent>
    </div>
  );
}
