import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const featured = searchParams.get("featured");
  const sort = searchParams.get("sort") || "-createdAt";

  const query: any = {
    isActive: true,
  };

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (featured === "true") {
    query.isFeatured = true;
  }

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate("category")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({
    success: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();

  const slug = slugify(body.name, {
    lower: true,
    strict: true,
  });

  const exists = await Product.findOne({
    slug,
  });

  if (exists) {
    return NextResponse.json(
      {
        success: false,
        message: "Product already exists",
      },
      {
        status: 409,
      }
    );
  }

  const product = await Product.create({
    ...body,
    slug,
  });

  return NextResponse.json(
    {
      success: true,
      data: product,
    },
    {
      status: 201,
    }
  );
}