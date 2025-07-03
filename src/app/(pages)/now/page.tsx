"use client";
import MainContent from "@/components/MainContent";
import { BookCard } from "@/app/(pages)/books/components/BookCard";
import now from "@/static/now.json";
import { useEffect, useState } from "react";

export default function Now() {

	const [nowData, setNowData] = useState<any>(now);

	useEffect(() => {
		const fetchNowData = async () => {
			try {
				const response = await fetch("/api/v1/now");
				const data = await response.json();
				setNowData(data);
			} catch (error) {
				setNowData(now);
			}
		};
		fetchNowData();
	}, []);


	return (
		<MainContent>
			<section className="w-full md:w-1/2 flex flex-col items-start justify-start gap-8 py-16 mx-auto">
				<div className="flex flex-col items-start justify-start gap-2">
					<h1 className="text-2xl font-bold">So! Currently...</h1>
				</div>

				{nowData?.sections.map((section: any, index: number) => {
					if (typeof section === 'string') return null;
					return (
						<div key={index} className="flex flex-col items-start justify-start gap-2 w-full">
							<h2 className="text-xl font-bold">{section.title || "No title available"}</h2>
							<p className="text-md text-foreground/80 mb-2">{section.description || "No description available"}</p>
							<ul className="list-disc list-inside space-y-1 ml-4">
								{section.items?.map((item: string | { title: string, author: string, description: string }, idx: number) => (
									<li key={idx} className="text-md text-foreground/80 list-outside">
										{typeof item === 'string' ? item : (
											<BookCard key={idx} title={item.title} author={item.author} description={item.description} status={"reading"} />
										)}
									</li>
								))}
							</ul>
						</div>
					);
				})}

				<p className="text-sm text-foreground/50">Last Updated: {nowData.lastUpdated || "Unknown"}</p>
				<p className="text-md text-foreground/80 mt-4" dangerouslySetInnerHTML={{ __html: nowData.attribution || "No attribution available" }}></p>
			</section>
		</MainContent>
	);
}