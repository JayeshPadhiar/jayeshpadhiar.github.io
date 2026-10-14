import type { Product } from "@/lib/content";

export default function Products({ products }: { products: Product[] }) {
	return (
		<section id="products" className="w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-border">
			<h2 className="text-2xl font-bold">Products</h2>
			<div className="flex flex-row flex-wrap gap-4 justify-start items-start w-full">
				{products.map((product) => (
					<ProductCard key={product.url} {...product} />
				))}
			</div>
		</section>
	);
}

const ProductCard = ({ title, description, url }: Product) => {
	return (
		<div className="w-full md:w-1/3 md:min-w-[300px] md:max-w-[400px] flex flex-col items-start justify-start gap-4 px-4 py-4 border-1 border-border rounded-lg self-stretch">
			<h3>{title}</h3>
			<p className="text-sm text-muted">{description}</p>
			<a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-start gap-2 text-muted mt-auto hover:underline">
				Visit {new URL(url).hostname}
				<span>
					<i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
				</span>
			</a>
		</div>
	);
};
