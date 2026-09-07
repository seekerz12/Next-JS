import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Validate credentials (replace with your DB check / bcrypt compare)
    if (username !== "admin" || password !== "password123") {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = "demo-jwt-session-token-xyz"; // Or sign a JWT

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