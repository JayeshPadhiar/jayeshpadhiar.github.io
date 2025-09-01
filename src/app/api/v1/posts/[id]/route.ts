import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongoose";
import Post from "@/lib/db/models/Post";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		console.log(id);
		await connectMongoose();
		const post = await Post.findOne({ slug: id });
		console.log('post', post);
		
		return NextResponse.json({ success: true, post });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
	}
}