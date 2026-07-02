import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Rental from "@/models/Rental";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const query: any = {};

  if (status) {
    query.status = status;
  }

  const total = await Rental.countDocuments(query);

  const rentals = await Rental.find(query)
    .populate("user", "fullName email phone")
    .populate("product", "name images monthlyRent")
    .populate("order")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const filtered = search
    ? rentals.filter((r: any) =>
        r.product?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : rentals;

  return NextResponse.json({
    success: true,
    data: filtered,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}