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

export const updateQuestion = async (questions: Question[],businessId: string) =>{
    const response = await api.put(`/feedback/${businessId}/questions`,{questions});
    return response;
}

export const deleteQuestion = async (businessId: string,index?: number) =>{
    const response = await api.delete(`/feedback/${businessId}/questions`,{
        data: {index}
    });
    return response;
}