"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary({ cart }: { cart: any }) {
  const subtotal = cart?.items?.reduce(
    (sum: number, item: any) => sum + item.product.monthlyRent * item.quantity,
    0
  ) || 0;

  const deposit = cart?.items?.reduce(
    (sum: number, item: any) => sum + item.product.securityDeposit * item.quantity,
    0
  ) || 0;

  const total = subtotal + deposit;

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Monthly Rent</span>
          <span className="font-medium text-slate-900">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Security Deposit</span>
          <span className="font-medium text-slate-900">₹{deposit.toLocaleString()}</span>
        </div>

        <Separator className="bg-slate-100" />

        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-slate-900">Total Due</span>
          <span className="text-2xl text-blue-600">₹{total.toLocaleString()}</span>
        </div>
        
        <p className="text-[11px] text-slate-400 text-center pt-2">
          Includes all taxes and initial security deposit.
        </p>
      </div>
    </Card>
  );
}