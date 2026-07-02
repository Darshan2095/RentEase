"use client";

import { Badge } from "@/components/ui/badge";

const variants = {
  PLACED: "secondary",
  CONFIRMED: "default",
  SHIPPED: "outline",
  DELIVERED: "default",
  ACTIVE: "default",
  RETURNED: "secondary",
  CANCELLED: "destructive",
} as const;

export default function OrderStatusBadge({
  status,
}: {
  status: keyof typeof variants;
}) {
  return (
    <Badge variant={variants[status] ?? "secondary"}>
      {status}
    </Badge>
  );
}