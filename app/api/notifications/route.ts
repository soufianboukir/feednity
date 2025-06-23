import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { dbConnection } from '@/config/db'
import notificationModel from '@/models/notification.model'

export async function GET() {
    await dbConnection()

    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const notifications = await notificationModel.find({ recipient: session.user.id })
            .sort({ createdAt: -1 })
            .populate('business')
            .lean()
            .limit(5)

        return NextResponse.json({ notifications }, { status: 200 })
  } catch (error) {
    console.error('[GET_NOTIFICATIONS_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
