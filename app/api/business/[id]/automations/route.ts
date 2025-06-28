import { dbConnection } from "@/config/db"
import businessModel from "@/models/business.model"
import { NextResponse } from "next/server"

interface Params {
    params: { id: string }
}

export async function PATCH(
    req: Request,
    { params }: Params
    ) {
    const { id } = params

    const body = await req.json()
    const { key, value } = body

    await dbConnection()

    if (typeof key !== "string" || typeof value !== "boolean") {
        return NextResponse.json({ error: "Invalid key or value" }, { status: 400 })
    }

    try {
        const business = await businessModel.findByIdAndUpdate(
            id,
            { [`automations.${key}`]: value },
            { new: true }
        )

        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, automations: business.automations })
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
