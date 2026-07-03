"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  cart: any;
}

export default function CartSummary({ cart }: Props) {
  const subtotal = cart?.items?.reduce((total: number, item: any) => 
    total + (item.monthlyRent * item.quantity), 0) || 0;

  const deposit = cart?.items?.reduce((total: number, item: any) => 
    total + (item.securityDeposit * item.quantity), 0) || 0;

  const total = subtotal + deposit;

  return (
    <Card className="sticky top-24 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Monthly Rent</span>
          <span className="font-medium text-slate-900">₹{subtotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-sm text-slate-600">
          <span>Security Deposit</span>
          <span className="font-medium text-slate-900">₹{deposit.toLocaleString()}</span>
        </div>
        
        <Separator className="bg-slate-100" />
        
        <div className="flex justify-between items-center text-lg font-bold text-slate-900">
          <span>Total Due Today</span>
          <span className="text-xl text-blue-600">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <Button asChild className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold hover:bg-blue-700">
        <Link href="/checkout">
          Proceed to Checkout
        </Link>
      </Button>

      <p className="text-center text-xs text-slate-400">
        Secure payment processing. Renting is refundable.
      </p>
    </Card>
  );
}