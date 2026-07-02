"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { productService } from "../services/product.service";

export function useBulkProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ids,
      action,
    }: {
      ids: string[];
      action:
        | "DELETE"
        | "ACTIVATE"
        | "DEACTIVATE";
    }) =>
      productService.bulkAction(ids, action),

    onSuccess: (_, variables) => {
      toast.success(
        `${variables.action} completed successfully`
      );

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product-stats"],
      });
    },
  });
}