"use client";

import { useState } from "react";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";

export default function RentalCard({
  rental,
}: {
  rental: any;
}) {
  const [now] = useState(() => Date.now());

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(rental.endDate).getTime() -
        now) /
        (1000 * 60 * 60 * 24)
    )
  );

  const imageSrc = rental.product?.images?.[0] || "/placeholder.jpg";
  const imageAlt = rental.product?.name || "Rental product image";

  return (
    <Card className="overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={500}
        height={300}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {rental.product?.name}
          </h2>

          <RentalStatusBadge
            status={rental.status}
          />
        </div>

        <p>
          ₹{rental.monthlyRent}/month
        </p>

        <p>
          Ends on{" "}
          {new Date(
            rental.endDate
          ).toLocaleDateString()}
        </p>

        <p>{daysLeft} days remaining</p>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
          >
            Extend
          </Button>

          <Button
            className="flex-1"
            variant="destructive"
          >
            Return
          </Button>
        </div>
      </div>
    </Card>
  );
}