import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { dbConnection } from '@/config/db'
import feedbackModel, { Feedback } from '@/models/feedback.model'
import { FilterQuery } from 'mongoose'
import { authOptions } from '@/lib/authOptions'

export async function GET(req: NextRequest) {
    await dbConnection()
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)

    const businessId = searchParams.get('businessId')
    const rating = searchParams.get('rating')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = 10
    const skip = (page - 1) * limit

    if (!businessId) {
        return NextResponse.json({ error: 'businessId is required' }, { status: 400 })
    }

    const filters: FilterQuery<Feedback> = { business: businessId }

    if (rating) {
        filters.rating = rating
    }

    if (dateFrom || dateTo) {
        filters.createdAt = {}
        if (dateFrom) filters.createdAt.$gte = new Date(dateFrom)
        if (dateTo) filters.createdAt.$lte = new Date(dateTo)
    }

    try {
        const total = await feedbackModel.countDocuments(filters)

        const feedbacks = await feedbackModel.find(filters)
                                .sort({ createdAt: -1 })
                                .skip(skip)
                                .limit(limit)
                                .lean()

        return NextResponse.json({
            feedbacks,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        })
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
