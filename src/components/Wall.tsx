"use client";
import { useState } from "react";

export default function Wall() {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const styles = {
		container: "w-full flex flex-col items-start justify-start gap-4 py-16 border-t-1 border-foreground/10",
		title: "text-2xl font-bold",
		wall: "w-full h-[400px] border-1 border-foreground/10 rounded-[10px] relative overflow-hidden",
		toggleButton: "absolute top-2 right-2 p-2 z-10 w-fit rounded-full",
	}

	const FullscreenIcon = () => (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
		</svg>
	);

	const CloseIcon = () => (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<line x1="18" y1="6" x2="6" y2="18"></line>
			<line x1="6" y1="6" x2="18" y2="18"></line>
		</svg>
	);

	return (
		<section id="wall" className={styles.container}>
			<h1 className={styles.title}>My Wall</h1>
			<p className="text-foreground/80 text-sm mb-4">
				I'd love to know you stopped by :) <br /> PS: Fullscreen mode recommended for better experience.
			</p>
			<div
				className={`${styles.wall} transition-all duration-300 ease-in-out`}
				style={isFullscreen ? {
					position: 'fixed',
					top: '2vh',
					left: '2vw',
					width: '96vw',
					height: '96vh',
					zIndex: '50',
					borderRadius: '10px',
					backgroundColor: 'rgba(0, 0, 0, 0.9)'
				} : {}}
			>
				<button
					className={styles.toggleButton}
					onClick={() => setIsFullscreen(!isFullscreen)}
					title={isFullscreen ? "Exit fullscreen" : "Open in fullscreen"}
				>
					{isFullscreen ? <CloseIcon /> : <FullscreenIcon />}
				</button>
				<iframe
					src="https://www.yourworldoftext.com/~jayeshpadhiar/"
					frameBorder="0"
					className="w-full h-full"
					style={isFullscreen ? {
						transform: 'scale(0.75)',
						transformOrigin: 'top left',
						width: '133.33%',
						height: '133.33%'
					} : {
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