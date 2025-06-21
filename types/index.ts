export interface Business {
    _id?:string;
    name: string;
    description?: string;
    industry?: string;
    logo?: string;
    feedbackLink?: string;
    qrCodeUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}