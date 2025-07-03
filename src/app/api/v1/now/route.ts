import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/db/mongo";

export async function GET() {

    const mongoClient = await getMongoClient();
    const db = mongoClient.db("jayeshpadhiarcom");
    const nowCollection = db.collection("now");
    const nowData = await nowCollection.findOne({});

    return NextResponse.json(nowData);
}