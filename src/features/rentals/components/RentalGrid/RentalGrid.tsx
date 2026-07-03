"use client";

import { useState } from "react";
import { Inbox, Loader2 } from "lucide-react";
import { useRentals } from "../../hooks/useRentals";
import RentalCard from "../RentalCard/RentalCard";

interface RentalProduct {
  name: string;
  images?: string[];
}

interface RentalStructure {
  _id: string;
  status: "ACTIVE" | "COMPLETED" | "OVERDUE" | "PENDING";
  monthlyRent: number;
  startDate: string | Date;
  endDate: string | Date;
  product?: RentalProduct;
}

export default function RentalGrid() {
  const { data, isLoading } = useRentals({
    page: 1,
    limit: 20,
  });

  const rentals: RentalStructure[] = data?.data ?? [];

  // Handler integrations for state/modal pipelines
  const handleExtendLease = (rental: RentalStructure) => {
    console.log("Triggering extend workflow for contract:", rental._id);
    // Open extend modal pipeline logic goes here
  };

  const handleReturnAsset = (rental: RentalStructure) => {
    console.log("Triggering off-hiring asset return protocol:", rental._id);
    // Open return confirmation modal workflow goes here
  };

  // 1. Premium Loading State: Multi-card Skeleton Layout
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div 
            key={`skeleton-${idx}`} 
            className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4 animate-pulse shadow-sm h-[400px] flex flex-col justify-between"
          >
            <div className="bg-slate-200/80 rounded-xl h-44 w-full" />
            <div className="space-y-3 flex-1 pt-3">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded-md w-1/2" />
                <div className="h-5 bg-slate-200 rounded-full w-1/4" />
              </div>
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 rounded-md w-2/3 pt-1" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-10 bg-slate-200 rounded-xl flex-1" />
              <div className="h-10 bg-slate-200 rounded-xl flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Premium Empty State: Illustrative Content Slate
  if (rentals.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 mb-4">
          <Inbox className="h-8 w-8 text-slate-400 stroke-[1.5]" />
        </div>
        <h3 className="text-base font-bold text-slate-800 tracking-tight">No active lease agreements</h3>
        <p className="text-[13px] text-slate-400 mt-1 max-w-sm font-medium leading-relaxed">
          You don't have any rental schedules on file matching this segment view. Browse our catalog to activate an asset.
        </p>
      </div>
    );
  }

  // 3. Render Grid Layer
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rentals.map((rental) => (
        <RentalCard
          key={rental._id}
          rental={rental}
          onExtend={handleExtendLease}
          onReturn={handleReturnAsset}
        />
      ))}
    </div>
  );
}