import VerificationCode from "@/models/verification-code.model";

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function saveVerificationCode(email: string) {
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await VerificationCode.updateMany(
        { email, used: false, expiresAt: { $gt: new Date() } },
        { used: true }
    );

    const verificationDoc = new VerificationCode({
        email,
        code,
        expiresAt,
        used: false,
        type: "email_verification",
    });

    await verificationDoc.save();

    return code;
}
