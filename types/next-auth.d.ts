import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    plan: 'free' | 'pro';
    isVerified: boolean;
  }

  interface Session {
    user: {
      id: string;
      plan: 'free' | 'pro';
      isVerified: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    plan: 'free' | 'pro';
    isVerified: boolean;
  }
}
