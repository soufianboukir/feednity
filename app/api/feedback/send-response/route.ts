import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const POST = async (req: NextRequest) => {
  try {
    const { to, subject, text, from } = await req.json()
    
    if (!to || !text || !from) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    await transporter.sendMail({
        from: `"No Reply" <${process.env.EMAIL_USER}>`, 
        to,
        subject,
        text: `This message was sent by: ${from}\n\n${text}`,
        replyTo: from,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
