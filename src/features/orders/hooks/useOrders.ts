"use client";

import { useQuery } from "@tanstack/react-query";
import {
  orderService,
  OrderFilters,
} from "../services/order.service";


export function useOrders(
  filters: OrderFilters = {}
) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () =>
      orderService.getOrders(filters),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () =>
      orderService.getOrder(id),
    enabled: !!id,
  });
}


