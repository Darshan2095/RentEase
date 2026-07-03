import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { isValidObjectId } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

async function resolveCategoryId(category: unknown) {
  if (!category || typeof category !== "string") {
    return null;
  }

  if (isValidObjectId(category)) {
    return category;
  }

  const categoryDoc = await Category.findOne({
    $or: [
      { name: category },
      { slug: slugify(category, { lower: true, strict: true }) },
    ],
  });

  return categoryDoc?._id?.toString() ?? null;
}

async function normalizeProductInput(body: any) {
  const categoryId = await resolveCategoryId(body.category);

  if (!categoryId) {
    return null;
  }

  const slug = body.slug
    ? slugify(body.slug, {
        lower: true,
        strict: true,
      })
    : slugify(body.name, {
        lower: true,
        strict: true,
      });

  return {
    ...body,
    category: categoryId,
    slug,
  };
}

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
    query.category = (await resolveCategoryId(category)) ?? category;
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
  const items = Array.isArray(body) ? body : [body];

  const normalizedItems = await Promise.all(
    items.map((item) => normalizeProductInput(item))
  );

  if (normalizedItems.some((item) => !item)) {
    return NextResponse.json(
      {
        success: false,
        message: "Valid category is required",
      },
      { status: 400 }
    );
  }

  const slugs = normalizedItems.map((item) => item!.slug);
  const uniqueSlugs = new Set(slugs);

  if (uniqueSlugs.size !== slugs.length) {
    return NextResponse.json(
      {
        success: false,
        message: "Duplicate product slugs found in request",
      },
      { status: 409 }
    );
  }

  const existingProducts = await Product.find({
    slug: { $in: slugs },
  }).select("slug");

  if (existingProducts.length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: "One or more products already exist",
      },
      { status: 409 }
    );
  }

  const createdProducts = Array.isArray(body)
    ? await Product.insertMany(normalizedItems as any[])
    : await Product.create(normalizedItems[0]);

  return NextResponse.json(
    {
      success: true,
      data: createdProducts,
    },
    {
      status: 201,
    }
  );
}