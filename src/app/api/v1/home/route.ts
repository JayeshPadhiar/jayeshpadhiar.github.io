import { connectRedis } from '@/lib/db/redis';
import { getMongoClient } from '@/lib/db/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db('jayeshpadhiarcom');
        const homeCollection = db.collection('home');
        const home = await homeCollection.find().toArray();
        return NextResponse.json(home);
    } catch (error) {
        console.error(error);
    }
}