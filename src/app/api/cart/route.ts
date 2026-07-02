import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );

  const payload: any = verifyToken(token);

  const cart = await Cart.findOne({
    user: payload.userId,
  }).populate("items.product");

  return NextResponse.json({
    success: true,
    data: cart,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );

  const payload: any = verifyToken(token);

  const body = await req.json();

  const { productId, quantity, rentalTenure } = body;

  const product = await Product.findById(productId);

  if (!product)
    return NextResponse.json(
      { success: false },
      { status: 404 }
    );

  let cart = await Cart.findOne({
    user: payload.userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: payload.userId,
      items: [],
    });
  }

  const index = cart.items.findIndex(
    (item: any) =>
      item.product.toString() === productId
  );

  if (index >= 0) {
  cart.items[index].quantity += quantity;
  cart.items[index].rentalTenure = rentalTenure;
}else {
    cart.items.push({
  product: product._id,
  quantity,
  rentalTenure,
  monthlyRent: product.monthlyRent,
  securityDeposit: product.securityDeposit,
});
  }

  await cart.save();

  return NextResponse.json({
    success: true,
    message: "Added to cart",
  });
}