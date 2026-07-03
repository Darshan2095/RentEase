"use client";

import { CalendarDays, Hourglass, IndianRupee, ArrowRight, Eye, RefreshCw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RentalStatusBadge, { RentalStatusType } from "../RentalStatusBadge/RentalStatusBadge";

interface Props {
  rental: any;
  onView: () => void;
  onExtend: () => void;
  onReturn: () => void;
}

export default function UserRentalCard({
  rental,
  onView,
  onExtend,
  onReturn
}: Props) {
  // Safe math bounds computation for active subscription remaining runtime
  const remainingDays = Math.max(
    0,
    Math.ceil((new Date(rental.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  // Formatting utilities for consistent regional alignment
  const formattedRent = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rental.monthlyRent);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Safe check flags to cleanly disable structural triggers
  const isActionDisabled = rental.status === "RETURNED" || rental.status === "COMPLETED" || rental.status === "CANCELLED";

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 space-y-5 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Banner: Information Stack & Component Identifiers */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-[16px] text-slate-800 tracking-tight group-hover:text-[#2563EB] transition-colors leading-snug">
            {rental.product?.name ?? "Premium Rental Item"}
          </h3>
          <p className="text-[11px] font-mono font-bold text-slate-400 tracking-tight">
            CONTRACT ID: #{rental._id?.slice(-8).toUpperCase()}
          </p>
        </div>
        <RentalStatusBadge status={rental.status as RentalStatusType} className="shrink-0" />
      </div>

      {/* Center Core Matrix: Highlight Parameters Layout */}
      <div className="grid grid-cols-3 gap-2.5 rounded-xl bg-slate-50/60 border border-slate-100 p-3 text-center">
        
        {/* Metric Column: Start Node */}
        <div className="flex flex-col items-center space-y-1">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200/50 text-slate-400 shadow-sm/5">
            <CalendarDays className="h-4 w-4 stroke-[2]" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-tight">Commenced</span>
          <p className="text-[12px] font-bold text-slate-700 whitespace-nowrap">
            {formatDate(rental.startDate)}
          </p>
        </div>

        {/* Metric Column: Remaining Duration */}
        <div className="flex flex-col items-center space-y-1 border-x border-slate-200/60">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200/50 text-amber-500 shadow-sm/5">
            <Hourglass className="h-4 w-4 stroke-[2] animate-pulse-subtle" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-tight">Remaining</span>
          <p className="text-[12px] font-extrabold text-slate-800">
            {remainingDays} <span className="text-[10px] font-medium text-slate-500">Days</span>
          </p>
        </div>

        {/* Metric Column: Local Premium Cost */}
        <div className="flex flex-col items-center space-y-1">
          <div className="p-1.5 rounded-lg bg-white border border-slate-200/50 text-emerald-600 shadow-sm/5">
            <IndianRupee className="h-4 w-4 stroke-[2]" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-tight">Rate</span>
          <p className="text-[12px] font-bold text-emerald-700 whitespace-nowrap">
            {formattedRent}<span className="text-[10px] text-slate-400 font-medium font-sans">/mo</span>
          </p>
        </div>

      </div>

      {/* Base Panel Container: Action Nodes Layout Matrix */}
      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          onClick={onView}
          className="h-9 rounded-xl text-[12.5px] font-semibold border-slate-200 hover:bg-slate-50 text-slate-600 flex-1 gap-1.5 shadow-sm transition-all"
        >
          <Eye className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Details</span>
        </Button>

        <Button
          variant="outline"
          onClick={onExtend}
          disabled={isActionDisabled}
          className="h-9 rounded-xl text-[12.5px] font-semibold border-slate-200 text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50/50 disabled:opacity-50 flex-1 gap-1.5 shadow-sm transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Extend</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onReturn}
          disabled={isActionDisabled}
          className="h-9 rounded-xl text-[12.5px] font-bold bg-slate-100 hover:bg-amber-50 border border-slate-200/40 text-slate-700 hover:text-amber-700 disabled:opacity-50 flex-1 gap-1.5 transition-all"
        >
          <Undo2 className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Return</span>
        </Button>
      </div>

    </div>
  );
}