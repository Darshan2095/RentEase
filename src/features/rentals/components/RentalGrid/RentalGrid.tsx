"use client";

import { useRentals } from "../../hooks/useRentals";
import RentalCard from "../RentalCard/RentalCard";

export default function RentalGrid() {
  const { data, isLoading } = useRentals({
    page: 1,
    limit: 20,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const rentals = data?.data ?? [];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {rentals.map((rental: any) => (
        <RentalCard
          key={rental._id}
          rental={rental}
        />
      ))}

    </div>
  );
}