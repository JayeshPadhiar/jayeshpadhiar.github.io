import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Add your data fetching logic here
    const data = {
      message: "Hello from the home API"
    };
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 