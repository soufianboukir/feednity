import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  industry?: string;
  logo?: string;
  feedbackLink: string;
  qrCodeUrl?: string;
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
        description: {
            type: String,
            maxlength: 500,
        },
        industry: {
            type: String,
            enum: [
                "Restaurant",
                "Salon",
                "Software",
                "Retail",
                "Clinic",
                "Hotel",
                "Other",
            ],
            default: "Other",
        },
        logo: {
            type: String,
        },
        feedbackLink: {
            type: String,
            required: true,
            unique: true,
        },
        qrCodeUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", BusinessSchema);
