"use client";
import { useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState('light');
  const tabs = [
    {
      name: "Home",
      href: "/"
    },
    /*{
      name: "About",
      href: "/#about"
    },
    {
      name: "Skills",
      href: "/#skills"
    },
    {
      name: "Experience",
      href: "/#experience"
    },
    {
      name: "Projects",
      href: "/#projects"
    },
    {
      name: "Interests",
      href: "/#interests"
    },*/
    {
      name: "Now",
      href: "/now"
    },
    {
      name: "Books",
      href: "/books"
    },
    {
      name: "Contact",
      href: "/#contact"
    }
  ];


  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="w-full p-2 md:p-4 sticky top-0 bg-background z-10 border-b-1 border-foreground/10">
      <nav className="w-full flex flex-row items-center justify-center px-8 md:px-16 flex-wrap gap-2">
          {tabs.map((tab) => (
            <a className="text-sm md:text-base cursor-pointer hover:outline-[0.5px] hover:outline-foreground/50 rounded-full px-3 py-1" key={tab.name} href={tab.href}>
              {tab.name}
            </a>
          ))}

          <div className="flex flex-row items-center justify-center gap-2 cursor-pointer" onClick={toggleTheme}>
            <i className={`${theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}`}></i>
          </div>
      </nav>
    </header>
  );
}