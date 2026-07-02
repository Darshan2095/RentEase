import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Rental from "@/models/Rental";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Context
) {
  await connectDB();

  const { id } = await params;
  const { months } = await req.json();

  const rental = await Rental.findById(id);

  if (!rental) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 404,
      }
    );
  }

  rental.rentalTenure += months;

  rental.extensionCount += 1;

  rental.status = "EXTENDED";

  rental.endDate = new Date(
    rental.endDate.setMonth(
      rental.endDate.getMonth() + months
    )
  );

  await rental.save();

  return NextResponse.json({
    success: true,
    data: rental,
  });
}