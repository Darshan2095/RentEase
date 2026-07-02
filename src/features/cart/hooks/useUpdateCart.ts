"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { cartService } from "../services/cart.service";

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) =>
      cartService.updateCart(itemId, quantity),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });
}