"use client";

import { useState } from "react";
import { Loader2, CalendarClock, ArrowRight, HelpCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RentalProduct {
  name: string;
}

interface RentalUser {
  fullName: string;
}

interface RentalData {
  _id: string;
  endDate: string | Date;
  monthlyRent: number;
  product?: RentalProduct;
  user?: RentalUser;
}

interface ExtendRentalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: RentalData | null | undefined;
}

export default function ExtendRentalDialog({
  open,
  onOpenChange,
  rental,
}: ExtendRentalDialogProps) {
  const [months, setMonths] = useState("1");
  const [isPending, setIsPending] = useState(false); // Controlled wrapper placeholder for mutation simulation

  if (!rental) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMonths("1");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    setIsPending(true);
    // Mimicking the original useExtendRental framework submit pipeline hooks safely
    setTimeout(() => {
      setIsPending(false);
      onOpenChange(false);
    }, 1200);
  };

  const currentEndDate = new Date(rental.endDate);
  const newEndDate = new Date(currentEndDate);
  newEndDate.setMonth(newEndDate.getMonth() + Number(months));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const extraRentCost = Number(months) * rental.monthlyRent;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[460px] rounded-2xl p-6 gap-6 border-slate-100 bg-white shadow-2xl">
        
        {/* Context Header */}
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight">
            Extend Lease Term
          </DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500 leading-normal">
            Modify structural rental lengths. New billing statements will re-adjust automatically below.
          </DialogDescription>
        </DialogHeader>

        {/* Product Meta Header Block */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Target Asset
            </label>
            <h3 className="font-bold text-[15px] text-slate-900 tracking-tight">
              {rental.product?.name || "Premium Rental Asset"}
            </h3>
            <p className="text-[12px] text-slate-500 font-medium">
              Lease Holder: {rental.user?.fullName || "Verified Client"}
            </p>
          </div>
          <span className="text-[11px] font-mono bg-white border border-slate-200/60 font-bold px-2 py-0.5 rounded text-slate-500 shadow-sm/5">
            ID: {rental._id.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* Form Selector Element */}
        <div className="space-y-2">
          <Label htmlFor="duration-select" className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
            Extension Term Length
          </Label>
          <Select value={months} onValueChange={setMonths}>
            <SelectTrigger 
              id="duration-select"
              className="h-11 w-full rounded-xl border-slate-200 bg-slate-50/30 text-slate-800 text-[14px] font-medium focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
            >
              <SelectValue placeholder="Choose duration" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 p-1 shadow-xl">
              {[
                { label: "+1 Month Extension", value: "1" },
                { label: "+3 Months Quarter", value: "3" },
                { label: "+6 Months Half-Year", value: "6" },
                { label: "+12 Months Full-Year", value: "12" },
              ].map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="rounded-lg text-[13px] py-2.5 font-medium cursor-pointer focus:bg-slate-50 text-slate-700"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Financial Timeline Overview Block */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center space-x-2 text-slate-700">
            <CalendarClock className="h-4 w-4 text-slate-500 stroke-[2]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Projections Summary
            </span>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Timeline Shift Graphic Row */}
            <div className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg bg-slate-50/40 border border-slate-100">
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Close</p>
                <p className="text-[13px] font-semibold text-slate-600">{formatDate(currentEndDate)}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Adjusted Close</p>
                <p className="text-[13px] font-bold text-emerald-600">{formatDate(newEndDate)}</p>
              </div>
            </div>

            {/* Financial Multipliers Stack */}
            <div className="space-y-2 text-[13px] font-medium text-slate-600">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Base Monthly Rate</span>
                <span className="text-slate-900 font-semibold">₹{rental.monthlyRent.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Extension Multiple</span>
                <span className="text-slate-900 font-semibold">× {months} month(s)</span>
              </div>
              
              <div className="pt-3 border-t border-dashed border-slate-100 flex justify-between items-baseline">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-900 text-[14px]">Additional Premium Gross</span>
                  <HelpCircle className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                </div>
                <span className="text-base font-extrabold text-[#111827]">
                  ₹{extraRentCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Actions Suite */}
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-100"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-[13px] font-semibold shadow-md min-w-[140px] flex items-center justify-center space-x-1.5 transition-all duration-150 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm Extension</span>
            )}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}