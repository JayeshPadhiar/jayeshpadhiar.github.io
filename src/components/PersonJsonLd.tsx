import home from "@/static/home.json";
import { SITE_URL } from "@/lib/site";

export default function PersonJsonLd() {
	const data = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: home.hero.name,
		jobTitle: home.hero.title,
		url: SITE_URL,
		image: `${SITE_URL}${home.hero.image}`,
		sameAs: home.hero.socialLinks.map((link) => link.url).filter((url) => url.startsWith("http")),
	};

	return (
		<script
			type="application/ld+json"
			// "<" is escaped so the JSON can never close the script tag.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
		/>
	);
}
