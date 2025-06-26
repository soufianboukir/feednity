import { dbConnection } from '@/config/db'
import feedbackModel from '@/models/feedback.model'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    try {
        await dbConnection()

        const searchParams = req.nextUrl.searchParams
        const pageParam = searchParams.get('page') || '1'
        const businessId = searchParams.get('businessId')
        const rating = searchParams.get('rating')
        const page = parseInt(pageParam, 10) || 1
        const limit = 10
        const skip = (page - 1) * limit

        const query: any = {
            email: { $exists: true, $ne: '' },
        }

        if (rating) {
            query.rating = rating
        }

        if (businessId) {
            query.business = businessId
        }

        const total = await feedbackModel.countDocuments(query)

        const feedbacks = await feedbackModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        return NextResponse.json({
            feedbacks,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        })
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch feedbacks' },
            { status: 500 }
        )
    }
}
