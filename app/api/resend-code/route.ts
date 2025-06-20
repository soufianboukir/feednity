import { NextResponse } from "next/server";
import { dbConnection } from "@/config/db";
import VerificationCode from "@/models/verification-code.model";
import { sendVerificationEmail } from "@/lib/mail";
import { saveVerificationCode } from "@/lib/verification-code";

export async function POST(request: Request) {
  try {
    const email = await request.text();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    await dbConnection();

    await VerificationCode.deleteMany({ email, used: false });

    const code = await saveVerificationCode(email)

    await sendVerificationEmail(email,code)

    return NextResponse.json({ message: "Verification code resent" });
  } catch (error) {
    console.error("Resend code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
