import { dbConnection } from "@/config/db";
import businessModel from "@/models/business.model";
import feedbackModel from "@/models/feedback.model";
import User from "@/models/user.model";
import { startOfWeek, endOfWeek } from "date-fns";

export async function getWeeklyFeedbacks() {
    try{
        await dbConnection()
        const start = startOfWeek(new Date(), { weekStartsOn: 1 });
        const end = endOfWeek(new Date(), { weekStartsOn: 1 });

        const businesses = await businessModel.find({'automations.weeklySummaryEmail': true });
        const result = [];

        
        for (const business of businesses) {
            const feedbacks = await feedbackModel.find({
                business: business._id,
                createdAt: { $gte: start, $lte: end },
            });

            const total = feedbacks.length;
            const ratings = feedbacks.map(fb => parseInt(fb.rating));
            const avgRating = total ? (ratings.reduce((a, b) => a + b, 0) / total).toFixed(1) : "N/A";

            const breakdown = [1, 2, 3, 4, 5].map((star) => ({
                star,
                count: ratings.filter((r) => r === star).length,
            }));

            const lowRatings = feedbacks
                .filter(fb => parseInt(fb.rating) < 3)
                .map(fb => ({
                    rating: fb.rating,
                    comment: fb.comment,
                    name: fb.name,
                    createdAt: fb.createdAt,
                }));

            const user = await User.findById(business.owner.toString())
            result.push({
                ownerEmail: user.email,
                ownerTier: user.plan,
                businessName: business.name,
                feedbackCount: total,
                averageRating: avgRating,
                breakdown,
                lowRatings,
            });
        }

        return result;
    }catch(err){
        console.log(err);
    }
}
