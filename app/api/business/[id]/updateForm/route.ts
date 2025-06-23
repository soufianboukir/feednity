import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnection } from "@/config/db"
import businessModel from "@/models/business.model"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnection()
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params
    const body = await req.json()
    const { activeForm } = body

    const validForms = ["stars", "emojis", "select"]
    if (!validForms.includes(activeForm)) {
        return NextResponse.json({ error: "Invalid form type." }, { status: 400 })
    }

    try {
        const business = await businessModel.findByIdAndUpdate(
            id,
            { activeForm },
            { new: true }
        )

        if (!business) {
            return NextResponse.json({ error: "Business not found." }, { status: 404 })
        }

        return NextResponse.json({ message: "activeForm updated", business })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
