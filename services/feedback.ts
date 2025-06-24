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

export const feedbackPageData = async (query: string) =>{
    const response = await api.get(`/feedback?${query}`);
    return response
}