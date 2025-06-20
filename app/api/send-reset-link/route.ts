import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import PasswordResetToken from "@/models/password-reset-token.model";
import { sendResetLink } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const email = await request.text();

    if (!email || typeof email !== "string") {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    await dbConnection();

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json(
            { message: "If an account with that email exists, a reset link was sent." }
        );
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await PasswordResetToken.create({
        email,
        token,
        expiresAt,
        used: false,
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?email=${encodeURIComponent(email)}&token=${token}`;

    await sendResetLink(email,resetUrl)

    return NextResponse.json({
      message: "If an account with that email exists, a reset link was sent.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
