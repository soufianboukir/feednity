import { api } from "@/config/api"

export const getBusinesses = async () =>{
    const response = await api.get('/business');
    return response
}

export const addBusiness = async () =>{
    const response = await api.post('/business');
    return response;
}