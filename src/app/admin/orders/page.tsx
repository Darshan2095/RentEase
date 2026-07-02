"use client";

import { useState } from "react";

import OrderFilters from "@/features/orders/components/OrderFilters/OrderFilters";
import OrderTable from "@/features/orders/components/OrderTable/OrderTable";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Order Management
        </h1>

        <p className="text-muted-foreground">
          Manage customer rental orders.
        </p>
      </div>

      <OrderFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <OrderTable
        page={page}
        search={search}
        status={status}
        onPageChange={setPage}
      />

    </div>
  );
}