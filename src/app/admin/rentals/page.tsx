"use client";

import { useState } from "react";
import { ClipboardList, RotateCcw, CalendarClock } from "lucide-react";
import RentalTable from "@/features/rentals/components/RentalTable/RentalTable";
import RentalFilters from "@/features/rentals/components/RentalFilters/RentalFilters";

export default function RentalsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header with Visual Identity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Rental Overview</h1>
            <p className="text-sm text-slate-500">Monitor active, overdue, and returned rental cycles.</p>
          </div>
        </div>
      </div>

      {/* Filter Section: Contained for focus */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <RentalFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
      </div>

      {/* Main Table Area */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <RentalTable
          page={page}
          search={search}
          status={status}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}