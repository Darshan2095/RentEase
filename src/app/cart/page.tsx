"use client";

import CartItem from "@/features/cart/components/CartItem/CartItem";
import CartSummary from "@/features/cart/components/CartSummary/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
import { useUpdateCart } from "@/features/cart/hooks/useUpdateCart";
import { useRemoveCart } from "@/features/cart/hooks/useRemoveCart";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const updateCart = useUpdateCart();
  const removeCart = useRemoveCart();

  // Premium Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-5xl py-20 px-4">
        <Skeleton className="mb-8 h-10 w-48" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
          </div>
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  // Premium Empty State
  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center text-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 max-w-sm text-slate-500">
          Looks like you haven't added anything to your rental cart yet. Explore our collection to find something you love.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900">
        Shopping Cart <span className="text-slate-400 font-normal text-xl">({cart.items.length} items)</span>
      </h1>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items Area */}
        <div className="space-y-6 lg:col-span-2">
          {cart.items.map((item: any) => (
            <CartItem
              key={item._id}
              item={item}
              onIncrease={() => updateCart.mutate({ itemId: item._id, quantity: item.quantity + 1 })}
              onDecrease={() => item.quantity > 1 && updateCart.mutate({ itemId: item._id, quantity: item.quantity - 1 })}
              onRemove={() => removeCart.mutate(item._id)}
            />
          ))}
        </div>

        {/* Summary Area */}
        <aside className="lg:col-span-1">
          <CartSummary cart={cart} />
        </aside>
      </div>
    </div>
  );
}