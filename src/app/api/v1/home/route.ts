import { getMongoClient } from '@/lib/db/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const homeCollection = db.collection('home');
        const home = await homeCollection.findOne({});
        return NextResponse.json(home);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching home", error: error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedData = await request.json();
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const homeCollection = db.collection('home');
        const home = await homeCollection.findOne({});
        //console.log(updatedData);
        await homeCollection.updateOne({ _id: home?._id }, { $set: updatedData });
        return NextResponse.json({ message: "Home updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating home", error: error }, { status: 500 });
    }
}