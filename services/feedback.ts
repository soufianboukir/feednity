import { api } from "@/config/api"

export type FeedbackForm = {
    name?: string;
    email?: string;
    comment: string;
    rating: string;
}

export const submitFeedback = async (formData: FeedbackForm,businessFeedbackSlug: string) =>{
    const response = await api.post(`/feedback/submit/${businessFeedbackSlug}`,formData);
    return response
}