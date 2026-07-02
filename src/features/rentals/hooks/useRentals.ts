"use client";

import { useQuery } from "@tanstack/react-query";
import {
  rentalService,
  RentalFilters,
} from "../services/rental.service";

export function useRentals(
  filters: RentalFilters = {}
) {
  return useQuery({
    queryKey: ["rentals", filters],
    queryFn: () =>
      rentalService.getRentals(filters),
  });
}