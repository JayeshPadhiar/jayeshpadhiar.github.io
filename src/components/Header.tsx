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
  return (
    <header className="w-full p-4 sticky top-0 bg-background z-10">
        <nav className="w-full flex flex-row items-center justify-center px-16">
            <ul className="flex flex-row items-center justify-between w-full gap-4">
                {tabs.map((tab) => (
                    <li className="cursor-pointer hover:outline-[0.5px] hover:outline-foreground/50 rounded-full px-3 py-1" key={tab.name}>
                        <a href={tab.href}>{tab.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  );
}