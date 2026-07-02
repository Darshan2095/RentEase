"use client";

import { Card } from "@/components/ui/card";

export default function ActiveRentals() {
  const rentals = [
    {
      id: 1,
      product: "Wooden Study Table",
      status: "Active",
    },
    {
      id: 2,
      product: "Single Bed",
      status: "Active",
    },
  ];

  return (
    <Card className="p-6">

      <h2 className="mb-4 text-xl font-semibold">
        Active Rentals
      </h2>

      <div className="space-y-4">

        {rentals.map((rental) => (
          <div
            key={rental.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <span>{rental.product}</span>

            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
              {rental.status}
            </span>
          </div>
        ))}

      </div>

    </Card>
  );
}