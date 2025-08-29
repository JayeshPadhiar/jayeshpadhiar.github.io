import BlogCard from "@/app/(pages)/blogs/components/BlogCard";

export default function Blogs({ blogs }: { blogs: any[] }) {
	return (
		<section id="blogs" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10">
			<h1 className="text-2xl font-bold">Blogs</h1>
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{blogs.map((blog, index) => (
					<BlogCard key={index} title={blog.title} link={blog.link} categories={blog.categories} image={blog.image} date={blog.date} description={blog.description} />
				))}
			</div>
			<a href="/blogs" className="flex flex-row items-center justify-start gap-2 text-foreground/80">
				View All Blogs
				<span>
					<i className={`fa-solid fa-arrow-right`}></i>
				</span>
			</a>
		</section>
	);
}