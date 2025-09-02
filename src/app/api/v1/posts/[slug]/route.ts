import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongoose";
import Post from "@/lib/db/models/Post";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params;
		await connectMongoose();
		const post = await Post.findOne({ slug });
		return NextResponse.json({ success: true, post });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params;
		const body = await request.json();
		await connectMongoose();
		const post = await Post.findOneAndUpdate({ slug }, body, { new: true });
		return NextResponse.json({ success: true, post });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		console.log("DELETE");
		const { slug } = await params;
		console.log("slug", slug);
		await connectMongoose();
		await Post.findOneAndDelete({ slug });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
	}
}