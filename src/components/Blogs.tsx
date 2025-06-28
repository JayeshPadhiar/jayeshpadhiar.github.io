import BlogCard from "@/app/blogs/components/BlogCard";
import { FaArrowRight } from "react-icons/fa";

export default function Blogs() {
	return (
		<section id="blogs" className="w-full flex flex-col items-start justify-start gap-4 px-8 py-16 border-t-1 border-foreground/10">
			<h1 className="text-2xl font-bold">Blogs</h1>
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				<BlogCard title="Blog 1" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-1.jpg" />
				<BlogCard title="Blog 1" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-1.jpg" />
			</div>
            <a href="/blogs" className="flex flex-row items-center justify-start gap-2 text-foreground/80">View All Blogs <span><FaArrowRight /></span></a>
		</section>
	);
}