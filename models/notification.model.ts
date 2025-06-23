import mongoose, { Schema, Document } from 'mongoose'

export interface Notification extends Document {
  recipient: mongoose.Types.ObjectId
  type: 'feedback_received' | 'system' | 'reminder'
  message: string
  business?: mongoose.Types.ObjectId
  isRead: boolean
  createdAt: Date
}

const NotificationSchema = new Schema<Notification>(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['feedback_received', 'system', 'reminder'],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        business: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
)

export default mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema)
