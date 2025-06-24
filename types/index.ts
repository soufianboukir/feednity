export interface Business {
    _id?:string;
    name: string;
    activeForm: "select" | "stars" | "emojis";
    feedbackSlug: string;
    description?: string;
    industry?: string;
    logo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Feedback = {
    _id: string
    business: string
    name: string
    email: string
    rating: string
    comment?: string
    createdAt: string
}
  