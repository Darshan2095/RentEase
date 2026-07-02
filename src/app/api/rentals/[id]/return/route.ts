import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Rental from "@/models/Rental";
import Product from "@/models/Product";
import Order from "@/models/Order";

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

  rental.status = "RETURNED";
  rental.actualReturnDate = new Date();

  await rental.save();

  await Product.findByIdAndUpdate(
    rental.product,
    {
      $inc: {
        stock: rental.quantity,
      },
    }
  );

  await Order.findByIdAndUpdate(
    rental.order,
    {
      orderStatus: "RETURNED",
    }
  );

  return NextResponse.json({
    success: true,
    data: rental,
  });
}