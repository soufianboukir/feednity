import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/mail";
import { saveVerificationCode } from "@/lib/verification-code";
import notificationModel from "@/models/notification.model";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();    
    await dbConnection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
    });

    const code = await saveVerificationCode(email);

    await sendVerificationEmail(email, code);
    await notificationModel.create({
        recipient: newUser._id,
        type: "system",
        message: `🎉 Welcome aboard, ${newUser.name}! We're excited to have you with us.`
    })

    return NextResponse.json({
      message:
        "Registered successfully. Please check your email for the verification code.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    );
  }
}
