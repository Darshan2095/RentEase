import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
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
  const { orderStatus } = await req.json();

  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return NextResponse.json(
      { success: false, message: "Order not found" },
      { status: 404 }
    );
  }

  if (
    orderStatus === "DELIVERED"
  ) {
    const { createRentals } = await import("@/lib/createRentals");
    await createRentals(order._id.toString());
  }

  return NextResponse.json({
    success: true,
    data: order,
  });
}