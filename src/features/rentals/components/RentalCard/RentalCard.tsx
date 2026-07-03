"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, CalendarRange, ArrowUpDown, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";

interface RentalProduct {
  name: string;
  images?: string[];
}

interface RentalStructure {
  _id: string;
  status: "ACTIVE" | "COMPLETED" | "OVERDUE" | "PENDING";
  monthlyRent: number;
  endDate: string | Date;
  startDate: string | Date;
  product?: RentalProduct;
}

interface RentalCardProps {
  rental: RentalStructure;
  onExtend?: (rental: RentalStructure) => void;
  onReturn?: (rental: RentalStructure) => void;
}

export default function RentalCard({ rental, onExtend, onReturn }: RentalCardProps) {
  const [now] = useState(() => Date.now());

  // Precise time delta arithmetic execution
  const totalDuration = new Date(rental.endDate).getTime() - new Date(rental.startDate).getTime();
  const timeElapsed = now - new Date(rental.startDate).getTime();
  
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(rental.endDate).getTime() - now) / (1000 * 60 * 60 * 24))
  );

  // Dynamic progress bar calculation (bounded securely between 0 and 100)
  const progressPercent = totalDuration > 0 
    ? Math.min(100, Math.max(0, Math.round((timeElapsed / totalDuration) * 100))) 
    : 0;

  const imageSrc = rental.product?.images?.[0] || "/placeholder.jpg";
  const imageAlt = rental.product?.name || "Rental asset thumbnail";

  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      
      {/* Immersive Image Display Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={300}
          className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
          priority={false}
        />
        {/* Absolute Overlay Tracking Pill */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200/40 shadow-sm flex items-center space-x-1.5">
          <Clock className={`h-3.5 w-3.5 ${daysLeft <= 5 ? "text-rose-500 animate-pulse" : "text-slate-500"}`} />
          <span className="text-[12px] font-bold text-slate-800 tracking-tight">
            {daysLeft === 0 ? "Lease Expired" : `${daysLeft} days left`}
          </span>
        </div>
      </div>

      {/* Main Structural Detail Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Asset Header Title Line */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <h2 className="font-bold text-[16px] text-slate-900 tracking-tight truncate">
              {rental.product?.name || "Premium Contract Asset"}
            </h2>
            <p className="text-[15px] font-extrabold text-[#2563EB]">
              ₹{rental.monthlyRent.toLocaleString("en-IN")}<span className="text-[12px] font-medium text-slate-400">/mo</span>
            </p>
          </div>
          <div className="shrink-0 pt-0.5">
            <RentalStatusBadge status={rental.status} />
          </div>
        </div>

        {/* Dynamic Context Leasetime Track Indicator */}
        {rental.status === "ACTIVE" && (
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  progressPercent > 85 ? "bg-rose-500" : "bg-slate-900"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Term Progress</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        )}

        {/* Absolute Timeline Calendar Milestones */}
        <div className="pt-1.5 flex items-center text-[13px] text-slate-500 font-medium border-t border-slate-50">
          <CalendarRange className="h-4 w-4 mr-2 text-slate-400 shrink-0 stroke-2" />
          <span>
            Ends on{" "}
            <span className="font-semibold text-slate-800">
              {new Date(rental.endDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </span>
        </div>

        {/* Integrated Operations Button Drawer */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => onExtend?.(rental)}
            className="flex-1 h-10 rounded-xl border-slate-200 text-slate-700 bg-white font-semibold text-[13px] hover:bg-slate-50 hover:text-slate-900 transition-colors inline-flex items-center justify-center space-x-1.5"
          >
            <RefreshCcw className="h-3.5 w-3.5 opacity-80" />
            <span>Extend</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onReturn?.(rental)}
            className="flex-1 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 font-semibold text-[13px] transition-colors inline-flex items-center justify-center space-x-1.5"
          >
            <ArrowUpDown className="h-3.5 w-3.5 opacity-80" />
            <span>Return Asset</span>
          </Button>
        </div>

      </div>
    </Card>
  );
}