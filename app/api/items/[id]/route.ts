import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { Item } from "@/lib/models/items";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Unwrap the params promise first
    const { id } = await params;

    // Added category and amount here
    const { name, category, price, amount } = await request.json();
    await connectMongoDB();
    
    // 2. Use the resolved id
    await Item.findByIdAndUpdate(id, { name, category, price, amount });
    return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating item" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Unwrap the params promise first
    const { id } = await params; 
    
    // 2. Now you can safely use the resolved ID
    console.log(id);
    await Item.findByIdAndUpdate(id, { status: "DELETED" });
    
    return NextResponse.json({ message: "Item soft deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting item" }, { status: 500 });
  }
}