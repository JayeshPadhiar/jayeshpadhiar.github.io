import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Interests from "@/components/Interests";
import Footer from "@/components/Footer";
//import Blogs from "@/components/Blogs";
//import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="min-h-full w-full flex flex-col md:flex-row items-start justify-start">
      <Hero />
      <div className="w-[0.5px] h-full bg-foreground/20"></div>
      <MainContent>
        <About />
        <Skills />
        <Experience />
        {/*<Projects />
        <Blogs />*/}
        <Interests />
        <Contact />
        <Footer />
      </MainContent>
    </div>
  );
}
