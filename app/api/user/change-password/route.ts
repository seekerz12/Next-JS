import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { newPassword } = await request.json();
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ message: "Password too short" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ username: "admin" }, { password: hashedPassword });

  return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
}