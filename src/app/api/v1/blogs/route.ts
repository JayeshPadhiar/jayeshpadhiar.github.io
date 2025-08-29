import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(process.env.MONGO_DB);
    const blogsData = await db.collection("blogs").findOne({});
    return NextResponse.json({ success: true, message: "Blogs fetched successfully", code: 'BLOGS_FETCHED', blogs: blogsData?.blogs || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to get blogs", code: 'BLOGS_GET_FAILED', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
    const blogs = await request.json();
    const blogData = await db.collection("blogs").findOne({});
    if (blogData) {
      await db.collection("blogs").updateOne({_id: new ObjectId(blogData._id)}, {$set: { blogs: blogs }}, {upsert: true,});  
    } else {
      await db.collection("blogs").insertOne({ blogs: blogs });
    }

    return NextResponse.json({ success: true, message: "Blogs updated successfully", code: 'BLOGS_UPDATED' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update blogs", code: 'BLOGS_UPDATE_FAILED', error }, { status: 500 });
  }
}
