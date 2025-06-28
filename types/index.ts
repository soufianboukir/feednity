import { Automations, Question, Response } from "@/interface";

export interface Business {
    _id?:string;
    name: string;
    activeForm?: "select" | "stars" | "emojis";
    feedbackSlug?: string;
    description?: string;
    industry?: string;
    logo?: string;
    questions?: Question[];
    automations?: Automations;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Feedback = {
    _id: string
    business: string
    name: string
    email: string
    rating: string
    responses?: Response[]
    comment?: string
    createdAt: string
}
  