"use client";

import { useQuery } from "@tanstack/react-query";
import { cartService } from "../services/cart.service";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });
}