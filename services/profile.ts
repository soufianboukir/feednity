import { api } from "@/config/api"

export const updateProfileData = async (formData: FormData) =>{
    const response = await api.post('/profile/update',formData);
    return response;
}