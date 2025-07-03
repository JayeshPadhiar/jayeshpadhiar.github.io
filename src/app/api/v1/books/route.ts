import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";

export async function GET() {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db(process.env.MONGO_DB);
  const books = await db.collection("books").find().toArray();
  return NextResponse.json(books);
}