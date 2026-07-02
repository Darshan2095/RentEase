import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Rental from "@/models/Rental";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  await connectDB();

  const { id } = await params;

  const rental = await Rental.findById(id)
    .populate("user")
    .populate("product")
    .populate("order");

  if (!rental) {
    return NextResponse.json(
      {
        success: false,
        message: "Rental not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: rental,
  });
}