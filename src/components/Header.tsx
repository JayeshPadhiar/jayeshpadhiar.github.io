import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const tabs = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/posts/blog" },
  { name: "Articles", href: "/posts/article" },
  { name: "Bookshelf", href: "/books" },
  { name: "Now", href: "/now" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="w-full p-2 md:p-0 md:h-(--header-h) md:flex md:items-center sticky top-0 bg-background z-10 border-b-1 border-border">
      <nav aria-label="Primary" className="w-full flex flex-row items-center justify-center px-8 md:px-16 flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link className="text-sm md:text-base hover:bg-surface rounded-full px-3 py-1" key={tab.name} href={tab.href}>
            {tab.name}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
