import { api } from "@/config/api"

type RegisterData = {
    name: string;
    email: string,
    password: string
}

export const signUp = async (formData:RegisterData) =>{
    const response = await api.post('/register',formData)
    return response
}