import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import slugify from "slugify";

export async function GET() {
  await connectDB();

  const categories = await Category.find({
    isActive: true,
  }).sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: categories,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();

  const category = await Category.create({
    ...body,
    slug: slugify(body.name, {
      lower: true,
      strict: true,
    }),
  });

  return NextResponse.json({
    success: true,
    data: category,
  });
}