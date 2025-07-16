import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(process.env.MONGO_DB);
    const books = await db.collection("books").find().toArray();
    return NextResponse.json({ success: true, message: "Books fetched successfully", code: 'BOOKS_FETCHED', books }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to get books", code: 'BOOKS_GET_FAILED', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
    const books = await request.json();

    books.forEach(async (book: any) => {
      const result = await db.collection("books").updateOne({_id: new ObjectId(book._id)}, {$set: { ...book, _id: new ObjectId(book._id) }}, {upsert: true,});
    });
    
    return NextResponse.json({ success: true, message: "Books updated successfully", code: 'BOOKS_UPDATED' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update books", code: 'BOOKS_UPDATE_FAILED', error }, { status: 500 });
  }
}
