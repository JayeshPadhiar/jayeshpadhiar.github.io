import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(process.env.MONGO_DB);
    const booksData = await db.collection("books").findOne({});
    return NextResponse.json({ success: true, message: "Books fetched successfully", code: 'BOOKS_FETCHED', books: booksData?.books || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to get books", code: 'BOOKS_GET_FAILED', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
    const books = await request.json();
    const bookData = await db.collection("books").findOne({});
    if (bookData) {
      await db.collection("books").updateOne({_id: new ObjectId(bookData._id)}, {$set: { books: books }}, {upsert: true,});
    } else {
      await db.collection("books").insertOne({ books: books });
    }

    return NextResponse.json({ success: true, message: "Books updated successfully", code: 'BOOKS_UPDATED' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update books", code: 'BOOKS_UPDATE_FAILED', error }, { status: 500 });
  }
}
