import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";

export async function GET() {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db("jayeshpadhiarcom");
        const nowCollection = db.collection("now");
        const now = await nowCollection.findOne({});
        return NextResponse.json({ success: true, now });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch now data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db("jayeshpadhiarcom");
        const nowCollection = db.collection("now");
        const now = await request.json();
        await nowCollection.updateOne({ _id: now._id }, { $set: now }, { upsert: true });
        return NextResponse.json({ success: true, now: now });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update now data" }, { status: 500 });
    }
}