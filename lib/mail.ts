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


export const sendResetLink = async (email: string, resetUrl: string) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    await transporter.sendMail({
        from: `"feednity" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
            <p>If you did not request this, ignore this email.</p>
        `,
    });
}