"use client";

import { useState } from "react";

import RentalTable from "@/features/rentals/components/RentalTable/RentalTable";
import RentalFilters from "@/features/rentals/components/RentalFilters/RentalFilters";

export default function RentalsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Rental Management
        </h1>

        <p className="text-muted-foreground">
          Manage active and returned rentals.
        </p>
      </div>

      <RentalFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <RentalTable
        page={page}
        search={search}
        status={status}
        onPageChange={setPage}
      />

    </div>
  );
}