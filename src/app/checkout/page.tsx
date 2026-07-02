"use client";

import { useState } from "react";

import { useCart } from "@/features/cart/hooks/useCart";

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
      <div className="container py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <AddressForm
            address={address}
            setAddress={setAddress}
          />

        </div>

        <div className="space-y-6">

          <OrderSummary cart={cart} />

          <PlaceOrderButton address={address} />

        </div>

      </div>

    </div>
  );
}