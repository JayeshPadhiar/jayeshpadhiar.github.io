import Image from "next/image";
import Link from "next/link";
import type { Hero as HeroData } from "@/lib/content";

const isRoute = (url: string) => url.startsWith("/") && !url.startsWith("/files/");

export default function Hero({ hero }: { hero: HeroData }) {
  return (
    <section id="hero" className="w-full md:w-[32%] h-[calc(100dvh-var(--header-h))] md:sticky md:top-(--header-h) md:self-start flex flex-col items-center justify-center p-8 text-center">
      <Image src={hero.image} className="rounded-full aspect-square object-cover" alt={hero.name} width={140} height={140} priority />
      <h1 className="text-4xl md:text-2xl font-bold mt-4">{hero.name}</h1>
      <p className="text-2xl md:text-sm text-muted mt-2">{hero.title}</p>
      <div className="w-1/5 h-[0.5px] bg-border-strong my-4"></div>
      <p className="text-md md:text-sm text-muted mb-8">
        {hero.description}
      </p>
      <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
        {hero.socialLinks.map((link) => (
          <a href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer" key={link.platform}>
            <i className={link.icon} aria-hidden="true"></i>
          </a>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        {hero.buttons.map((button, index) => {
          const className = index === 0 ? "btn btn-primary" : "btn";
          return isRoute(button.url) ? (
            <Link href={button.url} className={className} key={button.label}>
              {button.label}
            </Link>
          ) : (
            <a href={button.url} target="_blank" rel="noopener noreferrer" className={className} key={button.label}>
              {button.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
