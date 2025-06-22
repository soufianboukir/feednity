export interface Business {
    _id?:string;
    name: string;
    feedbackSlug: string;
    description?: string;
    industry?: string;
    logo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}