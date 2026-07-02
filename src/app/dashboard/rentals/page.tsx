"use client";

import RentalGrid from "@/features/rentals/components/RentalGrid/RentalGrid";

export default function DashboardRentalsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          My Rentals
        </h1>

        <p className="text-muted-foreground">
          View and manage your rented products.
        </p>
      </div>

      <RentalGrid />

    </div>
  );
}