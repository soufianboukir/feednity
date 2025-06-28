import { api } from "@/config/api"


type Automation = {
    key: string,
    value : boolean
}

export const updateAutomations = async (data: Automation,businessId: string | undefined) =>{
    const response = await api.patch(`/business/${businessId}/automations`,data);
    return response;
}