import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import PasswordResetToken from "@/models/password-reset-token.model";

export async function POST(request: Request) {
    try {
        const { email, token, newPassword } = await request.json();

        if (
            !email ||
            !token ||
            !newPassword ||
            typeof email !== "string" ||
            typeof token !== "string" ||
            typeof newPassword !== "string"
            ) {
            return NextResponse.json(
                { error: "Email, token, and new password are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await dbConnection();

        const resetToken = await PasswordResetToken.findOne({
            email,
            token,
            used: false,
            expiresAt: { $gt: new Date() }, 
        });

        if (!resetToken) {
            return NextResponse.json(
                { error: "Invalid or expired password reset token" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        resetToken.used = true;
        await resetToken.save();

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
        );
    }
}
