import nodemailer from 'nodemailer'

export async function sendVerificationEmail(to: string, code: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"feednity" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Verify your account",
        html: `<p>Your verification code is: <b>${code}</b></p>`,
    });
}
