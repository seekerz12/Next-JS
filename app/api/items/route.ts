import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import AuditLog from "@/models/AuditLog";
// import Item from "@/models/Item";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Fetch items from DB
  return NextResponse.json({ items: [] }, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  // const newItem = await Item.create(data);

  // Write to Audit Log
  await AuditLog.create({
    action: "CREATE_ITEM",
    performedBy: "admin",
    itemId: data._id || "sample-id",
  });

  return NextResponse.json({ message: "Created and logged" }, { status: 201 });
}