// this page is for the admin to edit the homepage sections, books and now page
// this page consists of 3 sections on the left side of the page
// 1. Homepage Sections
// 2. Books
// 3. Now

// on the right side of the page, there will be a form to edit the selected page data

"use client";
import { useState } from "react";

export default function AdminPage() {
	const [selectedPage, setSelectedPage] = useState("Home");

	return (
		<div className="flex flex-row w-full h-full gap-4">
			<div className="flex flex-col w-[32%] h-full p-8 justify-start items-center">
				<h1 className="text-2xl font-bold">Admin</h1>
				<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
					{["Home", "Books", "Now"].map((page) => (
						<div key={page} className={`flex justify-center items-center w-full h-12 py-4 rounded-full cursor-pointer ${selectedPage === page ? "border-1 border-foreground/80" : "border-1 border-foreground/10"}`} onClick={() => setSelectedPage(page)}>
							<h1 className="text-sm font-bold">{page}</h1>
						</div>
					))}
				</div>
			</div>

			<div className="h-full w-[2px] bg-foreground/10"></div>

			<div className="flex flex-col w-2/3 h-full p-8">
				<h1 className="text-2xl font-bold text-center">{selectedPage} Settings</h1>
				<div className="flex flex-col w-full h-full gap-2 mt-4 items-center overflow-y-auto">
					{selectedPage === "Home" && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
							<form className="flex flex-col w-full h-full gap-2 mt-4 items-center">

								
							</form>
						</div>
					)}
					{selectedPage === "Books" && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">

						</div>
					)}
					{selectedPage === "Now" && (
						<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
						</div>
					)}
				</div>
				<button className="flex justify-center items-center w-[100px] h-12 py-4 bg-foreground/10 rounded-full ml-auto">Save</button>
			</div>
		</div>
	);
}