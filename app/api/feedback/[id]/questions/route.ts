import { dbConnection } from "@/config/db"
import businessModel from "@/models/business.model"
import { NextRequest, NextResponse,RequestEvent } from "next/server"


export async function GET(req: NextRequest, event: RequestEvent) {
        const businessId = event.params.id;
        await dbConnection()
        
        try {
        const business = await businessModel.findById(businessId).select("questions")
    
        if (!business) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 })
        }
    
        return NextResponse.json({ questions: business.questions })
        } catch {
            return NextResponse.json({ error: "Server error" }, { status: 500 })
        }
}

export async function POST(req: NextRequest, event: RequestEvent) {
    await dbConnection()
    const businessId = event.params.id;
    const body = await req.json()

    try {
        if (!Array.isArray(body.questions)) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
        }

        const business = await businessModel.findById(businessId)
        if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 })

        business.questions = body.questions
        await business.save()

        return NextResponse.json({ message: "Questions replaced", questions: business.questions })
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}


export async function PUT(req: NextRequest, event: RequestEvent) {
    await dbConnection()
    const businessId = event.params.id;

    try {
        const body = await req.json()

        if (!Array.isArray(body.questions)) {
            return NextResponse.json({ error: "Invalid questions payload" }, { status: 400 })
        }

        const updated = await businessModel.findByIdAndUpdate(
            businessId,
            { $set: { questions: body.questions } },
            { new: true }
        )

        if (!updated) {
            return NextResponse.json({ error: "Business not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Questions updated", questions: updated.questions })
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, event: RequestEvent) {
    await dbConnection()
    const businessId = event.params.id;
    const { index } = await req.json()
    
    try {
        if (typeof index !== "number") {
            return NextResponse.json({ error: "Missing or invalid index" }, { status: 400 })
        }

        const business = await businessModel.findById(businessId)
        if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 })

        business.questions.splice(index, 1)
        await business.save()

        return NextResponse.json({ message: "Question deleted", questions: business.questions })
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}

