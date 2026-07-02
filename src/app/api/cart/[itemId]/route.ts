import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { verifyToken } from "@/lib/jwt";

export async function PUT(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );

  const payload: any = verifyToken(token);

  const { quantity } = await req.json();

  const cart = await Cart.findOne({
    user: payload.userId,
  });

  if (!cart)
    return NextResponse.json(
      { success: false },
      { status: 404 }
    );

  const item = cart.items.id(params.itemId);

  if (!item)
    return NextResponse.json(
      { success: false },
      { status: 404 }
    );

  item.quantity = quantity;

  await cart.save();

  return NextResponse.json({
    success: true,
    message: "Cart Updated",
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
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
  });

  if (!cart)
    return NextResponse.json(
      { success: false },
      { status: 404 }
    );

  cart.items = cart.items.filter(
    (item: any) => item._id.toString() !== params.itemId
  );

  await cart.save();

  return NextResponse.json({
    success: true,
    message: "Item Removed",
  });
}