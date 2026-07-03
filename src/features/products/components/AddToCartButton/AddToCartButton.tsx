"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { cn } from "@/lib/utils";

interface Props {
  product: any;
}

export default function AddToCartButton({ product }: Props) {
  const mutation = useAddToCart();

  function handleAddToCart() {
    mutation.mutate({
      productId: product._id,
      quantity: 1,
      rentalTenure: product.rentalTenure?.[0] ?? 3,
    });
  }

  return (
    <Button
      className={cn(
        "w-full h-12 rounded-xl text-[14px] font-bold transition-all duration-300 active:scale-[0.97] shadow-lg",
        mutation.isSuccess 
          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
          : "bg-slate-900 hover:bg-slate-800 text-white"
      )}
      size="lg"
      disabled={mutation.isPending || mutation.isSuccess}
      onClick={handleAddToCart}
    >
      {mutation.isPending ? (
        <>
          <Loader2 className="mr-2.5 h-4 w-4 animate-spin" />
          Adding to inventory...
        </>
      ) : mutation.isSuccess ? (
        <>
          <CheckCircle2 className="mr-2.5 h-4 w-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2.5 h-4 w-4" />
          Add to Rental Cart
        </>
      )}
    </Button>
  );
}