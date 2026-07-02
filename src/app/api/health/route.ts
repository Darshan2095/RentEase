import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      status: "healthy",
      database: "connected",
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: "degraded",
        database: "unavailable",
        message: "Database Connection Failed",
      }
    );
  }
}