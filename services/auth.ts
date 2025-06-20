import { api } from "@/config/api"

type RegisterData = {
    name: string;
    email: string,
    password: string
}

type ResetPasswordData = {
    email: string;
    newPassword: string;
    token: string;
}

export const signUp = async (formData:RegisterData) =>{
    const response = await api.post('/register',formData)
    return response
}

export const resendCode = async (email: string) =>{
    const response = await api.post('/resend-code',email);
    return response
}

export const verifyCode = async (email: string, code: string) =>{
    const response = await api.post('/verify-code',{email,code});
    return response
}

export const sendResetLink = async (email: string) =>{
    const response = await api.post('/send-reset-link',email);
    return response
}

export const resetPassword = async (formData: ResetPasswordData) =>{
    const response = await api.post('/reset-password',formData);
    return response;
}