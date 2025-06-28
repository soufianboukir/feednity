import { dbConnection } from '@/config/db'
import businessModel from '@/models/business.model'
import feedbackModel from '@/models/feedback.model'
import notificationModel from '@/models/notification.model'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
    req: NextRequest,
    { params }: { params: { feedbackSlug: string } }
    ) {
    await dbConnection()

    const slug = params.feedbackSlug
    const body = await req.json()
    const { rating, comment, name, email, questions } = body

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
            responses: questions
        })

        await notificationModel.create({
            recipient: business.owner.toString(),
            type: "feedback_received",
            message: `A customer submitted feedback for your business ${business.name} — view it in your dashboard.`
        })

        return NextResponse.json({ message: 'Feedback submitted successfully', feedback })
    } catch (error) {
        console.error('Feedback submission error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
