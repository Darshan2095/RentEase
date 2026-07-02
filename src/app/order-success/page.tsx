"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center space-y-6">

      <h1 className="text-5xl font-bold text-green-600">
        🎉
      </h1>

      <h2 className="text-3xl font-bold">
        Order Placed Successfully
      </h2>

      <p className="text-muted-foreground">
        Your rental request has been submitted.
      </p>

      <Button asChild>
        <Link href="/dashboard/orders">
          View Orders
        </Link>
      </Button>

    </div>
  );
}