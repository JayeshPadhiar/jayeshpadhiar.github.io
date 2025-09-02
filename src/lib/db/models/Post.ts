import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema({
	title: { type: String, required: true, unique: true },
	slug: { type: String, unique: true },
	description: { type: String },
	link: { type: String, unique: true },
	status: { type: String, default: "draft", enum: ["draft", "published", "archived"] },
	categories: { type: String },
	image: { type: String },
	author: { type: String, default: "Jayesh Padhiar" },
	content: { type: String, default: "" },
	isOriginal: { type: Boolean, default: false, required: true },
	type: { type: String, default: "blog", enum: ["blog", "article"] },
	readingTime: { type: Number, default: 1 },
},
	{
		timestamps: true,
	}
);

//generate slug and set link
PostSchema.pre('save', function (next) {
	this.slug = this.title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();

	//if it is an original post, set the link
	if (this.isOriginal) {
		this.link = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/posts/${this.slug}`;
	}

	if(!this.description) {
		this.description = this.content?.substring(0, 160);
	}

	//extract first image from markdown post
	if (!this.image) {
		const allImages = this.content.match(/!\[.*?\]\((.*?)\)/g);
		if (allImages) {
			this.image = allImages[0].match(/!\[.*?\]\((.*?)\)/)?.[1];
		}
	}

	this.readingTime = Math.ceil((this.content || '').split(' ').length / 200) || 0;

	next();
});

const Post = mongoose.models.Post || model("Post", PostSchema);
export default Post;