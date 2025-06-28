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

export async function sendMail(subject: string, to: string, from: string, text: string){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    
    await transporter.sendMail({
        from: `"No Reply " <${process.env.EMAIL_USER}>`, 
        to,
        subject,
        text: `This message was sent by: ${from}\n\n${text}`,
        replyTo: from,
    })
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export type Breakdown = {
    star: number,
    count: number
}

export type LowRating = {
    rating: string,
    comment: string
}

export type Result = {
    ownerEmail: string;
    businessName: string;
    feedbackCount: number;
    averageRating: string;
    breakdown: Breakdown[];
    lowRatings: LowRating[];
    ownerTier?: string
}

export async function sendSummaryEmail(summary: Result) {
    const { ownerEmail, businessName, feedbackCount, averageRating, breakdown, lowRatings } = summary

    const breakdownText = breakdown.map((b: Breakdown) => `⭐ ${b.star}: ${b.count}`).join("<br>")
    const lowComments = lowRatings.map((r: LowRating) => `⭐ ${r.rating}: ${r.comment}`).join("<br>")

    const html = `
        <h2>Weekly Feedback Summary - ${businessName}</h2>
        <p><strong>Total Feedbacks:</strong> ${feedbackCount}</p>
        <p><strong>Average Rating:</strong> ${averageRating}</p>
        <p><strong>Rating Breakdown:</strong><br>${breakdownText}</p>
        ${lowRatings.length > 0 ? `<p><strong>Low Ratings:</strong><br>${lowComments}</p>` : ""}
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/panel">View Dashboard</a></p>
    `

    await transporter.sendMail({
        from: `"Feedback Platform" <${process.env.EMAIL_USER}>`,
        to: ownerEmail,
        subject: `Weekly Feedback Summary - ${businessName}`,
        html
    })
}
