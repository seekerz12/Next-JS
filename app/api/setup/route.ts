import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User"; // Adjust if your model path is different

export async function GET() {
  try {
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await User.findOneAndUpdate(
      { username: "admin" },
      { password: hashedPassword, role: "Admin" },
      { upsert: true }
    );
    return NextResponse.json({ message: "Success! User: admin | Pass: admin123" });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}