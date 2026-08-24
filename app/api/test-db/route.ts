import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "Successfully connected to MongoDB!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to connect to database" }, { status: 500 });
  }
}