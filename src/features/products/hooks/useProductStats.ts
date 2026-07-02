"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export function useProductStats() {
  return useQuery({
    queryKey: ["product-stats"],
    queryFn: dashboardService.getProductStats,
  });
}