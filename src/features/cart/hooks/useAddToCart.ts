"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { cartService } from "../services/cart.service";

export function useAddToCart() {
  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      cartService.addToCart,

    onSuccess: () => {

      toast.success(
        "Added to cart"
      );

      queryClient.invalidateQueries({
        queryKey:["cart"],
      });

    },

    onError: () => {

      toast.error(
        "Failed to add item"
      );

    }

  });
}