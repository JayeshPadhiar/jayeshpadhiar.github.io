import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const paths = ["", "/books", "/now", "/posts", "/posts/blog", "/posts/article"];

export default function sitemap(): MetadataRoute.Sitemap {
	return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
