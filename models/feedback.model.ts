import mongoose, { Schema, Document } from "mongoose"

export interface Feedback extends Document {
    business: mongoose.Types.ObjectId
    rating: number
    comment?: string
    createdAt: Date
    deviceInfo?: string
}

const FeedbackSchema = new Schema<Feedback>(
    {
        business: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
        deviceInfo: {
            type: String,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
)

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema)
