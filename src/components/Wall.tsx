export default function Wall() {

	const styles = {
		container: "w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10",
		title: "text-2xl font-bold",
		wall: "w-full h-[400px] border-1 border-foreground/10 rounded-[10px] relative overflow-hidden",
	}

	return (
		<section id="wall" className={styles.container}>
			<h1 className={styles.title}>My Digital Wall</h1>
			<div className={styles.wall}>
				<iframe
					src="https://www.yourworldoftext.com/~jayeshpadhiar/"
					frameBorder="0"
					className="w-full h-full"
					style={{ 
						transform: 'scale(0.75)', 
						transformOrigin: 'top left', 
						width: '133.33%', 
						height: '133.33%' 
					}}
				></iframe>
			</div>
		</section>
	);
}