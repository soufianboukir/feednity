import { dbConnection } from '@/config/db'
import businessModel from '@/models/business.model'
import feedbackModel from '@/models/feedback.model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
    req: NextRequest,
    { params }: { params: { feedbackSlug: string } }
    ) {
    await dbConnection()

    const slug = params.feedbackSlug
    const body = await req.json()
    const { rating, comment, name, email } = body

    try {
        const business = await businessModel.findOne({ feedbackSlug: slug })

        if (!business) {
            return NextResponse.json({ error: 'Business not found' }, { status: 404 })
        }

        const feedback = await feedbackModel.create({
            business: business._id,
            rating,
            comment,
            name,
            email,
        })

        return NextResponse.json({ message: 'Feedback submitted successfully', feedback })
    } catch (error) {
        console.error('Feedback submission error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
