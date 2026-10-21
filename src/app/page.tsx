import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Interests from "@/components/Interests";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Activity from "@/components/Activity";
import Posts from "@/components/Posts";
import PersonJsonLd from "@/components/PersonJsonLd";
import { getBooks } from "@/lib/books";

import home from "@/static/home.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const books = getBooks();
  const currentlyReading = books.filter((book) => book.status === "currently-reading");
  const recentlyFinished = books.filter((book) => book.status === "read").slice(0, 2);

  return (
    <>
      <PersonJsonLd />
      <main id="main" className="w-full flex flex-col md:flex-row items-start justify-start">
        <Hero hero={home.hero} />
        <div className="hidden md:block self-stretch w-[0.5px] bg-border"></div>
        <div className="w-full min-w-0 flex flex-col items-start justify-start px-8 md:px-16">
          <About about={home.about} />
          <Products products={home.products} />
          <Experience experience={home.experience} />
          <Projects projects={home.projects} />
          <Activity />
          <Posts type="article" />
          <Posts type="blog" />
          <Interests currentlyReading={currentlyReading} recentlyFinished={recentlyFinished} />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
