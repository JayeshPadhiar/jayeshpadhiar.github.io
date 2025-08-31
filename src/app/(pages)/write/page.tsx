import Editor from "@/components/Editor";
import MainContent from "@/components/MainContent";

export default function WritePage() {
	const styles = {
		container: 'w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden py-4',
		title: 'text-2xl font-bold',
		editor: 'w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden py-4',
	};
	return (
		<MainContent>
			<section className={styles.container}>
				<h1 className={styles.title}>Write</h1>
				<div className={styles.editor}>
					<Editor />
				</div>
			</section>
		</MainContent>
	);
}