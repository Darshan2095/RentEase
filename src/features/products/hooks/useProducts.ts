"use client";

import { useQuery } from "@tanstack/react-query";
import {
  productService,
  ProductFilters,
} from "../services/product.service";

export function useProducts(
  filters: ProductFilters = {}
) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () =>
      productService.getProducts(filters),
  });
}