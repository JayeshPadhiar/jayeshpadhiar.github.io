import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongoose";
import Post from "@/lib/db/models/Post";

export async function GET(request: Request) {
	const param: any = {};
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');

	if (type) {
		param['type'] = type;
	}

	try {
		await connectMongoose();
		const posts = await Post.find(param).sort({ createdAt: -1 }).select('-content');
		if (!posts || posts.length === 0) {
			return NextResponse.json({ error: "Posts not found", posts: [] }, { status: 404 });
		}

		return NextResponse.json({ success: true, posts });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch posts data" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await connectMongoose();
		const newPost = new Post(body);
		await newPost.save();

		return NextResponse.json({ success: true, post: newPost });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to update posts data" }, { status: 500 });
	}
}