import { api } from "@/config/api"
import { Question } from "@/interface";

export const getQuestions = async (businessId: string) =>{
    const response = await api.get(`/feedback/${businessId}/questions`);
    return response;
}

export const addQuestion = async (questions: Question[], businessId: string) =>{
    const response = await api.post(`/feedback/${businessId}/questions`,{questions});
    return response;
}