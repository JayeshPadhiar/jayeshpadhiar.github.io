import { getMongoClient } from '@/lib/db/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const resumeCollection = db.collection('resume');
        const resume = await resumeCollection.findOne({});
        return NextResponse.json({ html: resume?.html || '' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching resume", error: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { html } = await request.json();
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const resumeCollection = db.collection('resume');
        const resume = await resumeCollection.findOne({});

        if (resume) {
            await resumeCollection.updateOne({ _id: resume._id }, { $set: { html } });
        } else {
            await resumeCollection.insertOne({ html });
        }

        return NextResponse.json({ success: true, message: "Resume updated successfully", code: 'RESUME_UPDATED' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error updating resume", code: 'RESUME_UPDATE_FAILED', error }, { status: 500 });
    }
}
