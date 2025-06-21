
import NextAuth, { Account, NextAuthOptions, Profile, Session, User as UserType } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnection } from "@/config/db";
import User from "@/models/user.model";
import { type GoogleProfile } from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnection();
        
                const user = await User.findOne({ email: credentials?.email });
        
                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }
        
                const isMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );
        
                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }
        
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                    plan: user.plan,
                    isVerified: user.isVerified,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({
            account,
            profile,
        }: {
            account: Account | null;
            profile?: Profile | undefined;
        }): Promise<boolean | string> {
            if (account?.provider === "google" && profile?.email) {
                await dbConnection();

                const googleProfile = profile as GoogleProfile;

                const existingUser = await User.findOne({ email: googleProfile.email });

                if (existingUser) {
                    if (existingUser.password && existingUser.password !== "") {
                        return `/login?error=AccountExists&email=${encodeURIComponent(googleProfile.email)}`;
                    }
                    
                    return true;
                } else {
                    await User.create({
                        name: googleProfile.name,
                        email: googleProfile.email,
                        picture: googleProfile.picture,
                        isVerified: true,
                        plan: "free",
                        password: "",
                    });
                }
            }
        return true;
        },
        async jwt({ token, user , account}:{ token: JWT;user?: UserType; account?: Account | null}) {
            if (user || account?.provider === "google") {
                await dbConnection();
                const email = user?.email || token.email;
                const dbUser = await User.findOne({ email });
                
                if (dbUser) {
                  token.id = dbUser._id.toString();
                  token.name = dbUser.name;
                  token.email = dbUser.email;
                  token.image = dbUser.picture;
                  token.plan = dbUser.plan;
                  token.isVerified = dbUser.isVerified;
                }
              }
              return token;
        },
        async session({ session, token }:{ session: Session;token: JWT;}) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
                session.user.plan = token.plan as "free" | "pro";
                session.user.isVerified = token.isVerified as boolean;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
