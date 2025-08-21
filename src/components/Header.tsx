"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    changeTheme(currentTheme || 'dark');
  }, []);

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
      name: "Blogs",
      href: "/blogs"
    },
    {
      name: "Books",
      href: "/books"
    },
    {
      name: "Now",
      href: "/now"
    },
    {
      name: "Contact",
      href: "/#contact"
    }
  ];


  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  };

  return (
    <header className="w-full p-2 md:p-4 sticky top-0 bg-background z-10 border-b-1 border-foreground/10">
      <nav className="w-full flex flex-row items-center justify-center px-8 md:px-16 flex-wrap gap-2">
          {tabs.map((tab) => (
            <a className="text-sm md:text-base cursor-pointer hover:outline-[0.5px] hover:outline-foreground/50 rounded-full px-3 py-1" key={tab.name} href={tab.href}>
              {tab.name}
            </a>
          ))}

          <div className="flex flex-row items-center justify-center gap-2 cursor-pointer" onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
            <i className={`${theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}`}></i>
          </div>
      </nav>
    </header>
  );
}