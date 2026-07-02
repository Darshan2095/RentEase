import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PATCH(req: NextRequest) {
  await connectDB();

  const { ids, action } = await req.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "No products selected",
      },
      {
        status: 400,
      }
    );
  }

  switch (action) {
    case "ACTIVATE":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          isActive: true,
        }
      );
      break;

    case "DEACTIVATE":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          isActive: false,
        }
      );
      break;

    case "DELETE":
      await Product.deleteMany({
        _id: { $in: ids },
      });
      break;

    default:
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action",
        },
        {
          status: 400,
        }
      );
  }

  return NextResponse.json({
    success: true,
    message: "Bulk operation completed",
  });
}