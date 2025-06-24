import { NextResponse } from "next/server"
import { dbConnection } from "@/config/db"
import Feedback from "@/models/feedback.model"
import mongoose from "mongoose"

export async function GET(req: Request) {
    try {
        await dbConnection()

        const { searchParams } = new URL(req.url)
        const businessId = searchParams.get("businessId")

        if (!businessId || !mongoose.Types.ObjectId.isValid(businessId)) {
        return NextResponse.json({ error: "Invalid businessId" }, { status: 400 })
        }

        const id = new mongoose.Types.ObjectId(businessId)

        const totalFeedbacks = await Feedback.countDocuments({ business: id })

        const lastFeedback = await Feedback.findOne({ business: id })
                                .sort({ createdAt: -1 })
                                .lean()

        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentCount = await Feedback.countDocuments({
            business: id,
            createdAt: { $gte: sevenDaysAgo },
        })
        

        const avgRatingResult = await Feedback.aggregate([
            { $match: { business: id } },
            { $group: { _id: null, avg: { $avg: { $toInt: "$rating" } } } },
        ])
        const averageRating = avgRatingResult[0]?.avg || 0

        const monthAgo = new Date()
        monthAgo.setDate(monthAgo.getDate() - 7)

        // 5. Feedbacks per day (last 7 days)
        const perDayFeedbacks = await Feedback.aggregate([
            { $match: { business: id, createdAt: { $gte: monthAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ])

        // 6. Rating breakdown (pie chart)
        const ratingBreakdown = await Feedback.aggregate([
            { $match: { business: id } },
            { $group: { _id: "$rating", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ])

        return NextResponse.json({
            totalFeedbacks,
            lastFeedback,
            recentCount,
            averageRating: Number(averageRating.toFixed(2)),
            perDayFeedbacks,
            ratingBreakdown,
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
