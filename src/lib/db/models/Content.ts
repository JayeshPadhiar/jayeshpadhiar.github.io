import mongoose, { Schema, model } from "mongoose";

const ContentSchema = new Schema({
	title: { type: String, required: true, unique: true },
	slug: { type: String, unique: true },
	description: { type: String },
	link: { type: String, required: true, unique: true },
	status: { type: String, default: "draft", enum: ["draft", "published", "archived"] },
	categories: { type: String },
	image: { type: String },
	author: { type: String, default: "Jayesh Padhiar" },
	content: { type: String, required: true, default: "" },
	isOriginal: { type: Boolean, default: false, required: true },
	seo: {
		title: { type: String },
		description: { type: String },
		keywords: { type: String },
		image: { type: String },
	},
	type: { type: String, default: "blog", enum: ["blog", "article"] },
},
	{
		timestamps: true,
	}
);

ContentSchema.virtual('readingTime').get(function () {
	return Math.ceil((this.content || '')?.length / 200) || 0;
});

ContentSchema.pre('save', function (next) {
	this.slug = this.title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();

	//if it is an original content, set the link
	if (this.isOriginal) {
		this.link = `/${this.type}s/${this.slug}`;
	}

	//extract first image from markdown content
	if (!this.image) {
		const allImages = this.content.match(/!\[.*?\]\((.*?)\)/g);
		if (allImages) {
			this.image = allImages[0].match(/!\[.*?\]\((.*?)\)/)?.[1];
		}
	}

	next();
});

const Content = mongoose.models.Content || model("Content", ContentSchema);

export default Content;