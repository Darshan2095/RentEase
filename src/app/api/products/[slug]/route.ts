import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Context {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  await connectDB();

  const { slug } = await params;

  const product = await Product.findOne({
    slug,
  }).populate("category");

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Product not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  await connectDB();

  const { slug } = await params;

  const body = await req.json();

  const product = await Product.findOneAndUpdate(
    { slug },
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  await connectDB();

  const { slug } = await params;

  await Product.findOneAndDelete({
    slug,
  });

  return NextResponse.json({
    success: true,
    message: "Product deleted",
  });
}