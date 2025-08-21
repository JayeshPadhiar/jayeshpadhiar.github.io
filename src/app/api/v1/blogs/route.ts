import { NextResponse } from "next/server";

import Parser from 'rss-parser';

export async function GET() {
  try {
		let blogs: any = [];
		const parser = new Parser();
		const feed = await parser.parseURL('https://medium.com/feed/@jayeshpadhiar20');

		feed.items.forEach((item) => {	
			blogs.push(item);
		});

    return NextResponse.json({ success: true, message: "Blogs fetched successfully", blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to get blogs", code: 'BLOGS_GET_FAILED', error }, { status: 500 });
  }
}