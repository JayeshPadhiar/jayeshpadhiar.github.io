"use client";

import { useState, use } from "react";
import MainContent from "@/components/MainContent";

export default function Auth({ params }: { params: Promise<{ page: string }> }) {
	const { page } = use(params);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");	

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload = {
			username,
			password,
		};
		const response = await fetch(`/api/v1/auth/${page}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
		const data = await response.json();
	};

	return page === "login" || page === "signup" ? (
		<MainContent>
			<section className="flex flex-col items-center justify-center h-screen w-full gap-4">
				<h1 className="text-2xl font-bold">{page}</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/4">
					<input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					<input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					{page === "signup" && <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
					<button type="submit">{page}</button>
				</form>
			</section>
		</MainContent>
	) : (
		<MainContent>
			<section className="flex flex-col items-center justify-center h-screen w-full gap-4">
				<h1>404 Page Not Found</h1>
			</section>
		</MainContent>
	);
}


// route for this page is /auth?page=login or /auth?page=signup