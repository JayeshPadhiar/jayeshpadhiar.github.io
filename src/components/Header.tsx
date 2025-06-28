"use client";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const tabs = [
    {
      name: "About",
      href: "#about"
    },
    {
      name: "Skills",
      href: "#skills"
    },
    {
      name: "Experience",
      href: "#experience"
    },
    /*{
      name: "Projects",
      href: "#projects"
    },*/
    {
      name: "Interests",
      href: "#interests"
    },
    {
      name: "Contact",
      href: "#contact"
    }
  ]

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="w-full p-2 md:p-4 sticky top-0 bg-background z-10 border-b-1 border-foreground/10">
      <nav className="w-full flex flex-row items-center justify-between md:px-16">
        <ul className="flex flex-row items-center justify-center md:justify-center w-full md:gap-4 flex-wrap">
          {tabs.map((tab) => (
            <li className="cursor-pointer hover:outline-[0.5px] hover:outline-foreground/50 rounded-full px-3 py-1" key={tab.name}>
              <a href={tab.href}>{tab.name}</a>
            </li>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Toggle theme"
          >
            <FaSun className="w-5 h-5 hidden [data-theme='dark']:block" />
            <FaMoon className="w-5 h-5 block [data-theme='dark']:hidden" />
          </button>
        </ul>

      </nav>
    </header>
  );
}