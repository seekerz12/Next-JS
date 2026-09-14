import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User"; // Adjust this path if your User model is located elsewhere

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Connect to the database
    await connectMongoDB();

    // 2. Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 3. Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 4. Set the authentication cookie
    const token = "demo-jwt-session-token-xyz"; 
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: "Logged in successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Login error" }, { status: 500 });
  }
}