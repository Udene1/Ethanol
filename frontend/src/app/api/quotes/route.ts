import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession() as any;

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "APPROVED_BUYER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { items, deliveryAddress, specialNotes } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in quote request" }, { status: 400 });
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        userId: session.user.id,
        deliveryAddress,
        specialNotes,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            unit: "Unit", // Standardizing unit for now
          })),
        },
      },
    });

    return NextResponse.json({ message: "Quote request submitted", quoteId: quote.id }, { status: 201 });
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
