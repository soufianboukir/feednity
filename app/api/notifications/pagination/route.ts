import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { dbConnection } from '@/config/db'
import notificationModel from '@/models/notification.model'

export async function GET(req: NextRequest) {
    await dbConnection()
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit

    try {
        const total = await notificationModel.countDocuments({ recipient: session.user.id })
        const notifications = await notificationModel.find({ recipient: session.user.id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('business', 'name logo')
                .lean()

        return NextResponse.json({
            notifications,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        })
    } catch (error) {
        console.error('[GET_NOTIFICATIONS_ERROR]', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
