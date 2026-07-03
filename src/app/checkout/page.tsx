"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { Skeleton } from "@/components/ui/skeleton";
import AddressForm from "@/features/checkout/components/AddressForm/AddressForm";
import OrderSummary from "@/features/checkout/components/OrderSummary/OrderSummary";
import PlaceOrderButton from "@/features/checkout/components/PlaceOrderButton/PlaceOrderButton";

export default function CheckoutPage() {
  const { data: cart, isLoading } = useCart();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl py-20 px-4">
        <Skeleton className="mb-10 h-10 w-48" />
        <div className="grid gap-12 lg:grid-cols-3">
          <Skeleton className="h-96 w-full lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Secure Checkout
          </h1>
          <p className="text-slate-500 mt-1">Review your details to complete your rental order.</p>
        </div>

        {/* Checkout Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            <AddressForm address={address} setAddress={setAddress} />
          </div>

          {/* Right: Sticky Summary */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <OrderSummary cart={cart} />
            <PlaceOrderButton address={address} />
            
            {/* Added subtle trust badge/policy reminder */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <p className="text-xs text-slate-500">
                🔒 Guaranteed safe and secure checkout. 
                <br />Questions? <a href="#" className="text-blue-600 underline">Contact Support</a>
              </p>
            </div>
          </aside>
          
        </div>
      </div>
    </main>
  );
}