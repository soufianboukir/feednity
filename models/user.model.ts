import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    picture: string;
    isVerified: boolean;
    plan: 'free' | 'pro';
    planExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
        },
        picture: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            required: true
        },
        plan: {
            type: String,
            required: true,
            default: 'free'
        },
        planExpiresAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;