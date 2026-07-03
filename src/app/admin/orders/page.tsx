"use client";

import { useState } from "react";
import { PackageSearch, ArrowUpRight } from "lucide-react";
import OrderFilters from "@/features/orders/components/OrderFilters/OrderFilters";
import OrderTable from "@/features/orders/components/OrderTable/OrderTable";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Page Header: Clear Intent */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Order Management
          </h1>
          <p className="text-slate-500 mt-1">
            Track, process, and manage customer rental lifecycles.
          </p>
        </div>
        
        {/* Quick Stats or Actions could go here */}
        <div className="hidden md:flex gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            Total Orders: <span className="font-bold text-slate-900">1,248</span>
          </div>
        </div>
      </div>

      {/* Filter Bar: Needs to feel anchored */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <OrderFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
      </div>

      {/* Table Section: High Density */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <OrderTable
          page={page}
          search={search}
          status={status}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}