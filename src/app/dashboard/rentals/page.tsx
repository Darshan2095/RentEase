"use client";

import { useState } from "react";
import { Loader2, Inbox, Calendar, ShieldCheck, Clock, Activity } from "lucide-react";
import { useRentals } from "@/features/rentals/hooks/useRentals";

import UserRentalCard from "@/features/rentals/components/UserRentalCard/UserRentalCard";
import RentalDetailsDialog from "@/features/rentals/components/RentalDetailsDialog/RentalDetailsDialog";
import ExtendRentalDialog from "@/features/rentals/components/ExtendRentalDialog/ExtendRentalDialog";
import ReturnRentalDialog from "@/features/rentals/components/ReturnRentalDialog/ReturnRentalDialog";

export default function RentalsPage() {
  const { data, isLoading } = useRentals({
    page: 1,
    status: "",
  });

  const rentals = data?.data ?? [];

  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  // 1. Premium Loading Infrastructure Frame
  if (isLoading) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
        {/* Header Block Shimmer */}
        <div className="flex flex-col gap-2">
          <div className="h-8 w-44 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* Metric Strip Summary Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`metrics-skel-${i}`} className="h-20 rounded-2xl border border-slate-100 bg-slate-50/40 p-4 animate-pulse" />
          ))}
        </div>

        {/* Main User Rental Cards Grid Stack Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={`card-skel-${i}`} 
              className="rounded-2xl border border-slate-100 p-5 space-y-5 bg-white shadow-sm animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full" />
              </div>
              <div className="h-14 bg-slate-50/80 rounded-xl border border-slate-100" />
              <div className="flex gap-2.5">
                <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
                <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
                <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Derived contextual calculations for premium user summary ribbons
  const activeRentalsCount = rentals.filter((r: any) => r.status === "ACTIVE").length;
  const actionRequiredCount = rentals.filter((r: any) => {
    const remaining = Math.ceil((new Date(r.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return remaining <= 7 && r.status === "ACTIVE";
  }).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8 transition-all duration-300">
      
      {/* Premium Dashboard Typography Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            My Lease Portfolio
          </h1>
          <p className="text-[13.5px] text-slate-500 font-medium">
            Monitor asset updates, adjust contractual timelines, or coordinate returns.
          </p>
        </div>
        
        {/* Dynamic Context Status Badge Info Fragment */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-xl shadow-sm self-start sm:self-center">
          <Activity className="h-4 w-4 text-[#2563EB] animate-pulse" />
          <span className="text-[12px] font-bold text-slate-600 font-sans">
            System Live Logs Synced
          </span>
        </div>
      </div>

      {/* Analytics Summary Summary Ribbon */}
      {rentals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-xl border border-blue-100">
              <Calendar className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-slate-400 font-mono">Total Signed Logged</span>
              <p className="text-xl font-black text-slate-800">{rentals.length}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <ShieldCheck className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-slate-400 font-mono">Active Subscriptions</span>
              <p className="text-xl font-black text-slate-800">{activeRentalsCount}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-4 shadow-sm">
            <div className={`p-3 rounded-xl border ${actionRequiredCount > 0 ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse-subtle" : "bg-slate-50 text-slate-400 border-slate-100"}`}>
              <Clock className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wide uppercase text-slate-400 font-mono">Expiring Soon (&lt;7d)</span>
              <p className="text-xl font-black text-slate-800">{actionRequiredCount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Immersive Empty State Handler Container */}
      {rentals.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 shadow-inner">
              <Inbox className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h3 className="text-[16px] font-bold text-slate-800 tracking-tight">
              No Asset Records Discovered
            </h3>
            <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
              You haven't checked out any marketplace items under this user scope yet. Browse our catalog to activate a subscription block.
            </p>
          </div>
        </div>
      )}

      {/* Optimized Multi-Column Card Layout Grid */}
      {rentals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rentals.map((rental: any) => (
            <UserRentalCard
              key={rental._id}
              rental={rental}
              onView={() => {
                setSelectedRental(rental);
                setDetailsOpen(true);
              }}
              onExtend={() => {
                setSelectedRental(rental);
                setExtendOpen(true);
              }}
              onReturn={() => {
                setSelectedRental(rental);
                setReturnOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Synchronized Dialog Architecture Workflows */}
      <RentalDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        rental={selectedRental}
      />

      <ExtendRentalDialog
        open={extendOpen}
        onOpenChange={setExtendOpen}
        rental={selectedRental}
      />

      <ReturnRentalDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        rental={selectedRental}
      />
    </div>
  );
}