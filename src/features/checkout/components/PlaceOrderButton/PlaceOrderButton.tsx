"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { usePlaceOrder } from "@/features/orders/hooks/usePlaceOrder";

export default function PlaceOrderButton({
  address,
}: {
  address: any;
}) {
  const router = useRouter();

  const { mutate, isPending } =
    usePlaceOrder();

  return (
    <Button
      className="w-full"
      size="lg"
      disabled={isPending}
      onClick={() =>
        mutate(
          { address },
          {
            onSuccess: () => {
              router.push(
                "/order-success"
              );
            },
          }
        )
      }
    >
      {isPending
        ? "Placing Order..."
        : "Place Order"}
    </Button>
  );
}