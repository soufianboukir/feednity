import { api } from "@/config/api"

export interface ProfileData extends FormData {
    name: string;
    image: string
}

export const updateProfileData = async (formData: FormData) =>{
    const response = await api.post('/profile/update',formData);
    return response;
}