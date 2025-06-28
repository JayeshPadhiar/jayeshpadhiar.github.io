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
    <div className="h-full flex flex-col items-start justify-start md:flex-row md:items-start md:justify-start overflow-y-auto">
      <Hero />
      <div className="w-[0.5px] h-full bg-foreground/20"></div>
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
