import { api } from "@/config/api"

export const getDashboardData = async () =>{
    const response = await api.get(`/dashboard`);
    return response;
}