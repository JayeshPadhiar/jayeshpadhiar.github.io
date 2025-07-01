import { NextResponse } from 'next/server';
import { connectRedis } from '@/lib/db/redis';
import { getMongoClient } from '@/lib/db/mongo';


export async function GET() {
  try {
    const redisClient = await connectRedis();
    const mongoClient = await getMongoClient();

    const db = mongoClient.db('jayeshpadhiarcom');
    const blogsCollection = db.collection('blogs');
    const blogs = await blogsCollection.find().toArray();

    // TODO: Add your data fetching logic here
    const data = {
      message: "Hello from the home API",
      blogs: blogs
    };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 