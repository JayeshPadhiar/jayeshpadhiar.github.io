import Image from "next/image";

export default function Hero({ heroData }: { heroData: any }) {
  return (
    <section id="hero" className="w-full md:w-[32%] md:h-full h-screen flex flex-col items-center justify-center p-8 text-center">
      <Image src="/images/profile.jpeg" className="rounded-full aspect-square object-cover" alt="Profile" width={140} height={140} />
      <h1 className="text-4xl md:text-2xl font-bold mt-4">{heroData.name}</h1>
      <p className="text-2xl md:text-sm text-foreground/80 mt-2">{heroData.title}</p>
      <div className="w-1/5 h-[0.5px] bg-foreground/50 my-4"></div>
      <p className="text-md md:text-sm text-foreground/80 mb-8">
        {heroData.description}
      </p>
      <div className="flex flex-row items-center justify-center gap-8 flex-wrap">
        {heroData.socialLinks.map((link: { icon: string, platform: string, url: string }, idx: number) => (
          <a href={link.url} target="_blank" rel="noopener noreferrer" key={idx}>
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        {heroData.buttons.map((button: { label: string, url: string }, idx: number) => (
          <a href={button.url} target="_blank" rel="noopener noreferrer" key={idx}>
            <button>{button.label}</button>
          </a>
        ))}
      </div>
    </section>
  );
}   