import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession() as any;

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "APPROVED_BUYER")) {
      return NextResponse.json({ error: "Unauthorized. Catalog access requires manual approval." }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
