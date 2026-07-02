"use client";

import { useQuery } from "@tanstack/react-query";
import { wishlistService } from "../services/wishlist.service";

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistService.getWishlist,
  });
}