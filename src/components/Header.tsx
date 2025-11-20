"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [theme, setTheme] = useState('dark');

  function signout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    changeTheme(currentTheme || 'dark');

    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
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
      href: "/posts?type=blog"
    },
    {
      name: "Articles",
      href: "/posts?type=article"
    },
    {
      name: "Bookshelf",
      href: "/books"
    },
    {
      name: "Now",
      href: "/now"
    },
    /*{
      name: "Write",
      href: "/write"
    },*/
    {
      name: "Contact",
      href: "/#contact"
    },
    /*{
      name: "Admin",
      href: "/admin"
    }*/
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

        <div className="cursor-pointer mr-2" onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
          <i className={`${theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}`}></i>
        </div>
        {
          token && <div className="cursor-pointer" onClick={() => signout()}>
            <i className="fa fa-sign-out"></i>
          </div>
        }
      </nav>
    </header>
  );
}