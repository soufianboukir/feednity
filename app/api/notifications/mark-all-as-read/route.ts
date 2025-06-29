import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { dbConnection } from '@/config/db'
import notificationModel from '@/models/notification.model'
import { authOptions } from '@/lib/authOptions'

export async function PATCH() {
    await dbConnection()

    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const result = await notificationModel.updateMany(
            { recipient: session.user.id, isRead: false },
            { $set: { isRead: true } }
        )

        return NextResponse.json(
            {
                message: 'All notifications marked as read',
                modifiedCount: result.modifiedCount,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('[NOTIFICATION_MARK_ALL_READ]', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
