import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const [
    totalProducts,
    activeProducts,
    featuredProducts,
    lowStockProducts,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Product.countDocuments({ isFeatured: true }),
    Product.countDocuments({
      stock: { $lte: 5 },
      isActive: true,
    }),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      totalProducts,
      activeProducts,
      featuredProducts,
      lowStockProducts,
    },
  });
}