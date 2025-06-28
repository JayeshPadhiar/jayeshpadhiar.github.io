import MainContent from "@/components/MainContent";
import BlogCard from "./components/BlogCard";

export default function Blogs() {
	return (
		<MainContent>
			<div className="w-full flex flex-col items-start justify-start gap-4 px-8 py-16">
				<h1 className="text-2xl font-bold">Blogs</h1>
				<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
					<BlogCard title="Blog 1" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-1.jpg" />
					<BlogCard title="Blog 2" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-2.jpg" />
					<BlogCard title="Blog 3" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-3.jpg" />
					<BlogCard title="Blog 4" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-4.jpg" />
					<BlogCard title="Blog 5" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-5.jpg" />
					<BlogCard title="Blog 6" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-6.jpg" />
					<BlogCard title="Blog 7" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." image="/images/blog-7.jpg" />
				</div>
			</div>
		</MainContent>
	);
}