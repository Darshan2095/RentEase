"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: any;
}

export default function AddToCartButton({
  product,
}: Props) {
  function handleAddToCart() {
    // TODO: Connect Cart API
    console.log(product);
  }

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add To Cart
    </Button>
  );
}