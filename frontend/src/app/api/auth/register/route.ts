import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, companyName, cacNumber, phoneNumber, address } = body;

    if (!email || !password || !name || !companyName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    
    // Check if this is the first user (make ADMIN)
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? "ADMIN" : "PENDING_BUYER";

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyName,
        cacNumber,
        phoneNumber,
        address,
        role,
      },
    });

    return NextResponse.json({ message: "Registration successful", userId: user.id }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
