"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "@/features/orders/hooks/usePlaceOrder";
import { Loader2, Lock } from "lucide-react";

export default function PlaceOrderButton({ address }: { address: any }) {
  const router = useRouter();
  const { mutate, isPending } = usePlaceOrder();

  return (
    <Button
      className="h-14 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
      size="lg"
      disabled={isPending || !address?.fullName || !address?.phone} // Basic safety check
      onClick={() =>
        mutate({ address }, {
          onSuccess: () => router.push("/order-success"),
        })
      }
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing Order...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Place Secure Order
        </>
      )}
    </Button>
  );
}