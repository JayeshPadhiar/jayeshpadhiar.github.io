import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function BlogCard({ title, description, image }: { title: string, description: string, image: string }) {
	return (
		<div className="w-1/3 min-w-[300px] max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-8 border-1 border-foreground/20 cursor-pointer" style={{ borderRadius: "10px" }}>
            <Image src={image} alt={title} width={100} height={100} />
			<h1>{title}</h1>
			<p className="text-sm text-foreground/60">{description}</p>
            <a href={`/blogs/${title}`} className="flex flex-row items-center justify-start gap-2 text-foreground/80">Read More <span><FaArrowRight /></span></a>
		</div>
	);
}