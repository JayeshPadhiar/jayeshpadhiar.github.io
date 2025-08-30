'use client';

import MainContent from "@/components/MainContent"
import { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard";

export default function Articles() {

	const [articles, setArticles] = useState<any[]>([]);

	async function fetchArticles() {
		const response = await fetch("/api/v1/articles");
		const data = await response.json();
		return data;
	}

	useEffect(() => {
		fetchArticles().then((data) => {
			setArticles(data.articles);
		});
	}, []);

	return (
		<MainContent>
			<section id="articles" className="w-full h-full flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<h1 className="text-2xl font-bold">Articles</h1>
				<div className="w-full flex flex-col  items-start justify-start gap-4 overflow-y-auto">
					{articles.map((article, index) => (
						<ArticleCard key={index} title={article.title} link={article.link} categories={article.categories} image={article.image} date={article.date} description={article.description} />
					))}
				</div>

				<div className="w-full flex flex-row items-center justify-start gap-2 mt-auto">
					<p className="text-foreground/50 text-sm">For more articles, visit my <a href="https://medium.com/@jayeshpadhiar20" target="_blank" className="text-foreground font-bold">Medium</a> page.</p>
				</div>
			</section>
		</MainContent>
	);
}