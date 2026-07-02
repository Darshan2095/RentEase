"use client";

import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  cart: any;
}

export default function CartSummary({ cart }: Props) {
  const subtotal =
    cart?.items?.reduce(
      (total: number, item: any) =>
        total +
        item.monthlyRent * item.quantity,
      0
    ) || 0;

  const deposit =
    cart?.items?.reduce(
      (total: number, item: any) =>
        total + item.securityDeposit,
      0
    ) || 0;

  const total = subtotal + deposit;

  return (
    <Card className="space-y-4 p-6 sticky top-24">

      <h2 className="text-xl font-semibold">
        Order Summary
      </h2>

      <div className="flex justify-between">
        <span>Monthly Rent</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Security Deposit</span>
        <span>₹{deposit}</span>
      </div>

      <hr />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <Button asChild className="w-full">
        <Link href="/checkout">
          Proceed to Checkout
        </Link>
      </Button>

    </Card>
  );
}