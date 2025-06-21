import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Business from "@/models/business.model";
import { authOptions } from "../auth/[...nextauth]/route";
import { dbConnection } from "@/config/db";

export const GET = async () => {
    try {
        await dbConnection();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const businesses = await Business.find({ owner: session.user.id });

        return NextResponse.json({ 
            businesses }, 
            { status: 200 }
        );
    } catch {
        return NextResponse.json({ 
            error: "Failed to fetch businesses" },
            { status: 500 }
        );
    }
};

export const POST = async (req: Request) => {
  try {
    await dbConnection();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, industry, logo } = body;

    if (!name) {
      return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    }

    const feedbackLink = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const business = await Business.create({
        owner: session.user.id,
        name,
        description,
        industry,
        logo,
        feedbackLink,
    });

    return NextResponse.json({ business });
  } catch {
    return NextResponse.json({ error: "Failed to create business" }, { status: 500 });
  }
};
