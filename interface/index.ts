import { Business } from "@/types"

export interface Notification {
    type: 'feedback_received' | 'system' | 'reminder'
    message: string
    business?: Business
    isRead: boolean
    createdAt: Date
}