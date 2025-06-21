import { api } from "@/config/api"

export const getBusinesses = async () =>{
    const response = await api.get('/business');
    return response
}

export const addBusiness = async (formData:FormData) =>{
    const response = await api.post('/business',formData);
    return response;
}

export const updateBusiness = async (formData:FormData) =>{
    const response = await api.put('/business',formData);
    return response;
}