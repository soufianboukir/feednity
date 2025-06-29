import { dbConnection } from "@/config/db";
import businessModel from "@/models/business.model";
import { NextResponse, RequestEvent } from "next/server";

export async function PATCH(req: Request, event: RequestEvent) {
  const { id } = event.params;

  const body = await req.json();
  const { key, value } = body;

  await dbConnection();

  if (typeof key !== "string" || typeof value !== "boolean") {
    return NextResponse.json({ error: "Invalid key or value" }, { status: 400 });
  }

  try {
    const business = await businessModel.findByIdAndUpdate(
      id,
      { [`automations.${key}`]: value },
      { new: true }
    );

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      automations: business.automations,
      message: "Automations updated successfully",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
