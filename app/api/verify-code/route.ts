import { NextResponse } from "next/server";
import { dbConnection } from "@/config/db";
import VerificationCode from "@/models/verification-code.model";
import User from "@/models/user.model";

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json();

        if (!email || typeof email !== "string" || !code || typeof code !== "string") {
            return NextResponse.json(
                { error: "Email and code are required" },
                { status: 400 }
            );
        }

        await dbConnection();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                { error: "No user with this email" },
                { status: 400 }
            );
        }

        const existingCode = await VerificationCode.findOne({
            email,
            code,
            used: false,
            expiresAt: { $gt: new Date() },
        });

        if (!existingCode) {
        return NextResponse.json(
            { error: "Invalid or expired verification code" },
            { status: 400 }
        );
        }

        existingCode.used = true;
        user.isVerified = true;
        
        await user.save();
        await existingCode.save();


        return NextResponse.json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Verify code error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
