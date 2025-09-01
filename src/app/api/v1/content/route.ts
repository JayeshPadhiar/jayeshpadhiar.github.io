
import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongoose";
import Content from "@/lib/db/models/Content";

export async function GET() {
	try {
		await connectMongoose();
		const content = await Content.find({});
		console.log(content);
		if (!content || content.length === 0) {
			return NextResponse.json({ error: "Content not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, content });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch content data" }, { status: 500 });
	}
}

export async function POST(request: Request) {

	try {
		const body = await request.json();
		await connectMongoose();
		const newContent = new Content(body);
		await newContent.save();

		return NextResponse.json({ success: true, content: newContent });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to update content data" }, { status: 500 });
	}
}