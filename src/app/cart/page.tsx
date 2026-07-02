"use client";

import CartItem from "@/features/cart/components/CartItem/CartItem";
import CartSummary from "@/features/cart/components/CartSummary/CartSummary";

import { useCart } from "@/features/cart/hooks/useCart";
import { useUpdateCart } from "@/features/cart/hooks/useUpdateCart";
import { useRemoveCart } from "@/features/cart/hooks/useRemoveCart";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();

  const updateCart = useUpdateCart();
  const removeCart = useRemoveCart();

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold">
          Your cart is empty
        </h2>

        <p className="mt-2 text-muted-foreground">
          Browse products and add your favorite rentals.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="space-y-4 lg:col-span-2">

          {cart.items.map((item: any) => (
            <CartItem
              key={item._id}
              item={item}
              onIncrease={() =>
                updateCart.mutate({
                  itemId: item._id,
                  quantity: item.quantity + 1,
                })
              }
              onDecrease={() => {
                if (item.quantity > 1) {
                  updateCart.mutate({
                    itemId: item._id,
                    quantity: item.quantity - 1,
                  });
                }
              }}
              onRemove={() =>
                removeCart.mutate(item._id)
              }
            />
          ))}

        </div>

        <CartSummary cart={cart} />

      </div>

    </div>
  );
}