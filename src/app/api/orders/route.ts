import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

import Cart from "@/models/Cart";
import Order from "@/models/Order";

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

  const cart = await Cart.findOne({
    user: payload.userId,
  }).populate("items.product");

  if (!cart || cart.items.length === 0)
    return NextResponse.json(
      { success: false },
      { status: 400 }
    );

  const subtotal = cart.items.reduce(
  (sum: number, item: any) =>
    sum +
    item.monthlyRent *
      item.quantity,
  0
);

  const deposit = cart.items.reduce(
  (sum: number, item: any) =>
    sum + item.securityDeposit,
  0
);
const deliveryCharge = cart.items.reduce(
  (sum: number, item: any) =>
    sum +
    (item.product.deliveryCharge ?? 0),
  0
);
  const order = await Order.create({
    user: payload.userId,

    items: cart.items.map((item: any) => ({
    product: item.product._id,
    productName: item.product.name,
    productImage: item.product.images?.[0] || "",
    quantity: item.quantity,
    rentalTenure: item.rentalTenure,
    monthlyRent: item.monthlyRent,
    securityDeposit: item.securityDeposit,
})),

    address: body.address,

    subtotal,

    securityDeposit: deposit,

    deliveryCharge,

total:
  subtotal +
  deposit +
  deliveryCharge,
  });

  cart.items = [];
  await cart.save();

  return NextResponse.json({
    success: true,
    data: order,
  });
}

export async function GET(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const payload: any = verifyToken(token);

  const {
    page = "1",
    limit = "10",
    status = "",
    search = "",
  } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  const query: any = {};

  if (payload.role !== "ADMIN") {
    query.user = payload.userId;
  }

  if (status && status !== "all") {
    query.orderStatus = status;
  }

  const orders = await Order.find(query)
    .populate("user", "fullName email phone")
    .populate("items.product")
    .sort({
      createdAt: -1,
    });

  let filtered = orders;

  if (search) {
    filtered = orders.filter((order: any) => {
      return (
        order.user?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }

  const start =
    (Number(page) - 1) * Number(limit);

  const end = start + Number(limit);

  return NextResponse.json({
    success: true,
    data: filtered.slice(start, end),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: filtered.length,
      totalPages: Math.ceil(
        filtered.length / Number(limit)
      ),
    },
  });
}