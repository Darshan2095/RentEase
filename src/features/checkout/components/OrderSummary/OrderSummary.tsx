"use client";

import { Card } from "@/components/ui/card";

export default function OrderSummary({
  cart,
}: {
  cart: any;
}) {
  const subtotal =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum +
        item.product.monthlyRent *
          item.quantity,
      0
    ) || 0;

  const deposit =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum +
        item.product.securityDeposit,
      0
    ) || 0;

  return (
    <Card className="space-y-4 p-6">

      <h2 className="text-xl font-bold">
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
        <span>₹{subtotal + deposit}</span>
      </div>

    </Card>
  );
}