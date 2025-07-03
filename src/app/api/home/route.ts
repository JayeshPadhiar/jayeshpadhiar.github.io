import { connectRedis } from '@/lib/db/redis';
import { getMongoClient } from '@/lib/db/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const redisClient = await connectRedis();
        const mongoClient = await getMongoClient();

        const db = mongoClient.db('jayeshpadhiarcom');
        const homeCollection = db.collection('home');
        const home = await homeCollection.find().toArray();

        const data = {
            home: home
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
    }
}