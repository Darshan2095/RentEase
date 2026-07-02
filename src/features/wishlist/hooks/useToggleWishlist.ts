"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { wishlistService } from "../services/wishlist.service";

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wishlistService.toggleWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
}