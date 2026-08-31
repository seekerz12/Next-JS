import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Item } from "@/lib/models/items";

export async function POST(request: Request) {
  try {
    // Added category and amount here
    const { name, category, price, amount } = await request.json();
    await connectMongoDB();
    await Item.create({ name, category, price, amount });
    return NextResponse.json({ message: "Item Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating item" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    // Filters out deleted items
    const items = await Item.find({ status: { $ne: "DELETED" } });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching items" }, { status: 500 });
  }
}