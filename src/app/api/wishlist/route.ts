import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const payload: any = verifyToken(token);

  let wishlist = await Wishlist.findOne({
    user: payload.userId,
  }).populate("products");

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: payload.userId,
      products: [],
    });
  }

  return NextResponse.json({
    success: true,
    data: wishlist,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const payload: any = verifyToken(token);

  const { productId } = await req.json();

  let wishlist = await Wishlist.findOne({
    user: payload.userId,
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: payload.userId,
      products: [],
    });
  }

  const exists = wishlist.products.some(
    (id: any) => id.toString() === productId
  );

  if (exists) {
    wishlist.products = wishlist.products.filter(
      (id: any) => id.toString() !== productId
    );
  } else {
    wishlist.products.push(productId);
  }

  await wishlist.save();

  return NextResponse.json({
    success: true,
    message: "Wishlist Updated",
  });
}