// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      plan: "free" | "pro";
      isVerified: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
    image?: string;
    plan: "free" | "pro";
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image?: string;
    plan: "free" | "pro";
    isVerified: boolean;
  }
}

