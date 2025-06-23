import mongoose, { Schema, Document } from "mongoose"

export interface Feedback extends Document {
    business: mongoose.Types.ObjectId
    rating: string
    comment?: string
    name: string
    email: string
    createdAt: Date
}

const FeedbackSchema = new Schema<Feedback>(
    {
        business: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        rating: {
            type: String,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
        name: {
            type: String
        },
        email: {
            type: String
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
)

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema)
