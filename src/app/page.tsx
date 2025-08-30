"use client";
import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Interests from "@/components/Interests";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import { useEffect, useState } from "react";

import home from "@/static/home.json";
import Blogs from "@/components/Blogs";
import Wall from "@/components/Wall";

export default function Home() {

  const [homeContent, setHomeContent] = useState(home);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
      const response = await fetch("/api/v1/home");
        const data = await response.json();
        setHomeContent(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    const fetchBlogs = async () => {
      const response = await fetch("/api/v1/blogs");
      const data = await response.json();
      setBlogs(data.blogs.slice(0, 3));
    };
    fetchHomeData();
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-full w-full flex flex-col md:flex-row items-start justify-start" id="home">
      <Hero hero={homeContent.hero} />
      <div className="w-[0.5px] h-full bg-foreground/20"></div>
      <MainContent>
        <About about={homeContent.about} />
        <Skills skills={homeContent.skills} />
        <Experience experience={homeContent.experience} />
        <Projects projects={homeContent.projects} />
        <Blogs blogs={blogs} />
        <Interests />
        <Wall />
        <Contact />
        <Footer />
      </MainContent>
    </div>
  );
}
