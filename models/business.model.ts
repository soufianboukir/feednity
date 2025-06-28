import { Automations, Question } from "@/interface";
import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid"

export interface IBusiness extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  feedbackSlug: string;
  description?: string;
  industry?: string;
  logo?: string;
  activeForm: "select" | "stars" | "emojis";
  questions?: Question[];
  automations: Automations;
  createdAt: Date;
  updatedAt: Date;
}
  

const BusinessSchema = new Schema<IBusiness>(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        feedbackSlug: {
            type: String,
            unique: true,
            required: true,
            default: () => nanoid(10)
        },
        description: {
            type: String,
            maxlength: 500,
        },
        industry: {
            type: String,
            default: "Other",
        },
        logo: {
            type: String,
        },
        activeForm: {
            type: String,
            enum: ['select','stars','emojis'],
            default: 'select',
            required: true
        },
        questions: [],
        automations: {
            lowRatingEmail: {
                type: Boolean,
                default: true,
            },
            weeklySummaryEmail: {
                type: Boolean,
                default: true,
            },
            autoReplyWithMessage: {
                type: Boolean,
                default: true,
            },
            weeklyPerformanceCompare: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", BusinessSchema);
