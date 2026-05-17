import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession() as any;

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "APPROVED_BUYER")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { amount, email, quoteId } = await request.json();

    if (!amount || !email) {
      return NextResponse.json({ error: "Missing amount or email" }, { status: 400 });
    }

    // Paystack API initialization
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    
    // In a real app, you would fetch from Paystack:
    // const response = await fetch("https://api.paystack.co/transaction/initialize", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${paystackSecret}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     amount: amount * 100, // Paystack uses kobo
    //     email,
    //     metadata: { quoteId },
    //   }),
    // });
    
    // For this B2B MVP, we return a mock success
    return NextResponse.json({
      message: "Payment initialized",
      authorization_url: "https://checkout.paystack.com/test_authorization_url",
      access_code: "test_access_code",
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
