import Link from "next/link";
import MainContent from "@/components/MainContent";

export default function NotFound() {
	return (
		<MainContent>
			<section className="w-full flex flex-col items-center justify-center gap-4 py-32 text-center">
				<h1 className="text-2xl font-bold">404: page not found</h1>
				<p className="text-sm text-muted">That page doesn&apos;t exist.</p>
				<Link href="/" className="btn">Back home</Link>
			</section>
		</MainContent>
	);
}
