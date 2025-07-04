// this page is for the admin to edit the homepage sections, books and now page
// this page consists of 3 sections on the left side of the page
// 1. Homepage Sections
// 2. Books
// 3. Now

// on the right side of the page, there will be a form to edit the selected page data

"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
	const [selectedPage, setSelectedPage] = useState("Home");

	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	function selectPage(page) {

		setSelectedPage(page);
		setLoading(true);
		fetch(`/api/v1/${page.toLowerCase()}`)
			.then(res => res.json())
			.then(data => {
				setData(data);
				setLoading(false);
			});
	}

	useEffect(() => {
		selectPage(selectedPage);
	}, [selectedPage]);

	const styles = {
		label: "text-sm text-foreground/60 font-bold",
		input: "py-1 rounded-full border-1 border-foreground/10 w-full text-xs",
		textarea: "py-1 rounded-full border-1 border-foreground/10 w-full h-24 text-xs no-scrollbar",
		addButton: "flex justify-center items-center h-8 min-w-8 py-4 bg-foreground/10 rounded-full ml-auto",
		section: "flex flex-col w-full gap-2 items-start",
	}


		return (
			<div className="flex flex-row w-full h-full gap-4">
				<div className="flex flex-col w-[25%] h-full p-8 justify-start items-center">
					<h1 className="text-2xl font-bold">Admin</h1>
					<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
						{["Home", "Books", "Now"].map((page) => (
							<div key={page} className={`flex justify-center items-center w-full h-12 py-4 rounded-full cursor-pointer ${selectedPage === page ? "border-1 border-foreground/80" : "border-1 border-foreground/10"}`}
								onClick={() => setSelectedPage(page)}>
								<h1 className="text-sm font-bold">{page}</h1>
							</div>
						))}
					</div>
				</div>

				<div className="h-full w-[2px] bg-foreground/10"></div>

				<div className="flex flex-col w-full h-full p-8 gap-4">
					<h1 className="text-2xl font-bold text-center">{selectedPage} Settings</h1>
					<div className="flex flex-col w-full h-full gap-4 items-center overflow-y-auto p-2">
						
						{/* Home */}
						{selectedPage === "Home" && !loading && (
								<form className="flex flex-col w-full h-full gap-4 items-center">

									<section className={styles.section}>
										<h1 className="text-lg font-bold">Hero</h1>
										<label className={styles.label}>Name</label>
										<input type="text" placeholder="Name" className={styles.input} defaultValue={data?.hero?.name} />
										<label className={styles.label}>Title</label>
										<input type="text" placeholder="Title" className={styles.input} defaultValue={data?.hero?.title} />
										<label className={styles.label}>Description</label>
										<textarea type="text" placeholder="Description" className={styles.textarea} defaultValue={data?.hero?.description} />
										<label className={styles.label}>Image URL</label>
										<input type="text" placeholder="Image URL" className={styles.input} defaultValue={data?.hero?.image} />
										<label className={styles.label}>Social Links</label>
										<div className="flex flex-row w-full gap-2 items-center flex-wrap">
											{data?.hero?.socialLinks?.map((socialLink, index) => (
												<div key={index} className="flex flex-row w-full gap-2 items-center">
													<input type="text" placeholder={`Social Link ${index + 1}`} className={styles.input} defaultValue={socialLink.url} />
												</div>
											))}
											<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Social Link </button>
										</div>
									</section>

									<section className={styles.section}>
										<h1 className="text-lg font-bold">About</h1>
										{data?.about?.sections?.map((section, index) => (
											<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
												<textarea type="text" placeholder="Content" className={styles.textarea} defaultValue={section.content} />
											</div>
										))}
										<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Section </button>
									</section>

									<section className={styles.section}>
										<h1 className="text-lg font-bold">Skills</h1>
										<div className="flex flex-row w-full gap-2 items-center flex-wrap">
											{data?.skills?.map((category, index) => (
												<div key={index} className="flex flex-col w-full gap-2 items-start">

													<label className={styles.label}>Category Name</label>
													<input type="text" placeholder="Category Name" className={styles.input} defaultValue={category.title} />
													<label className={styles.label}>Category Icon</label>
													<input type="text" placeholder="Category Icon" className={styles.input} defaultValue={category.icon} />
													
													<label className={styles.label}>Skills</label>
													{category.skills.map((skill, index) => (
														<div key={index} className="flex flex-row w-full gap-2 items-center">
															<input type="text" placeholder={`Skill ${index + 1}`} className={styles.input} defaultValue={skill} />
														</div>
													))}
													<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Skill </button>
												</div>
											))}
											<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Category </button>
										</div>
									</section>

									<section className={styles.section}>
										<h1 className="text-lg font-bold">Experience</h1>
										{data?.experience?.map((experience, index) => (
											<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
												<label className={styles.label}>Company</label>
												<input type="text" placeholder="Company" className={styles.input} defaultValue={experience.company} />
												<label className={styles.label}>Title</label>
												<input type="text" placeholder="Title" className={styles.input} defaultValue={experience.title} />
												<label className={styles.label}>Location</label>
												<input type="text" placeholder="Location" className={styles.input} defaultValue={experience.location} />
												<h1 className="text-lg font-bold">Roles</h1>
												{experience?.roles?.map((role, index) => (
													<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
														<label className={styles.label}>Period</label>
														<input type="text" placeholder="Period" className={styles.input} defaultValue={role.period} />
														<label className={styles.label}>Title</label>
														<input type="text" placeholder="Title" className={styles.input} defaultValue={role.title} />
														<label className={styles.label}>Description</label>
														{role.description.map((description, index) => (
															<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
																<input type="text" placeholder="Description" className={styles.input} defaultValue={description} />
															</div>
														))}
														<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> </button>
													</div>
												))}
												<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Role </button>
											</div>
										))}
										<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Experience </button>
									</section>

									<section className={styles.section}>
										<h1 className="text-lg font-bold">Projects</h1>
										{data?.projects?.map((project, index) => (
											<div key={index} className="flex flex-col w-full h-full gap-2 items-start">
												<h1 className="text-lg font-bold mt-4">Project {index + 1}</h1>
												<label className={styles.label}>Title</label>
												<input type="text" placeholder="Title" className={styles.input} defaultValue={project.title} />
												<label className={styles.label}>Description</label>
												<textarea type="text" placeholder="Description" className={styles.textarea} defaultValue={project.description} />
												<label className={styles.label}>URL</label>
												<input type="text" placeholder="URL" className={styles.input} defaultValue={project.url} />
											</div>
										))}
										<button className={styles.addButton}> <i className="fa-solid fa-plus"></i> Add Project </button>
									</section>
								</form>
						)}
						{selectedPage === "Books" && !loading && (
							<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">

							</div>
						)}
						{selectedPage === "Now" && !loading && (
							<div className="flex flex-col w-full h-full gap-2 mt-4 items-center">
							</div>
						)}
					</div>
					<button className="flex justify-center items-center w-[100px] h-12 py-4 bg-foreground/10 rounded-full ml-auto">Save</button>
				</div>
			</div>
		);
	}