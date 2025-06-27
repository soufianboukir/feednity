import { api } from "@/config/api"

export interface FeedbackForm {
    rating: string
    name: string
    email: string
    comment: string
    questions?: {
      label: string
      response: string | string[]
    }[]
}
  

export const submitFeedback = async (formData: FeedbackForm,businessFeedbackSlug: string) =>{
    const response = await api.post(`/feedback/submit/${businessFeedbackSlug}`,formData);
    return response;
}

export const feedbackPageData = async (query: string) =>{
    const response = await api.get(`/feedback?${query}`);
    return response;
}

export const feedbacksWithMails = async (query: string) =>{
    const response = await api.get(`/feedback/withEmails?${query}`);
    return response;
}