import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({
    isFeatured: true,
    isActive: true,
  }).limit(8);

  return NextResponse.json({
    success: true,
    data: products,
  });
}