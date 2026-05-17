import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession() as any;

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const { userId, action } = await request.json(); // action: "APPROVE", "REJECT"

    if (!userId || !action) {
      return NextResponse.json({ error: "Missing userId or action" }, { status: 400 });
    }

    const newRole = action === "APPROVE" ? "APPROVED_BUYER" : "REJECTED_BUYER";

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as any },
    });

    return NextResponse.json({ message: `User ${action.toLowerCase()}d successfully`, userId: user.id });
  } catch (error) {
    console.error("User approval error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
