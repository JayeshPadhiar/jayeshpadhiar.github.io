import type home from "@/static/home.json";

export type Hero = typeof home.hero;
export type Skill = (typeof home.skills)[number];
export type ExperienceEntry = (typeof home.experience)[number];
export type Project = (typeof home.projects)[number];

export type PostType = "blog" | "article";

export type Post = {
	title: string;
	link: string;
	description?: string;
	tags?: string;
	image?: string;
	type: PostType;
	createdAt?: string;
};
