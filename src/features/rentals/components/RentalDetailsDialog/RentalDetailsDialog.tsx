"use client";

import { useState } from "react";
import { 
  User, 
  Package, 
  CalendarDays, 
  ShieldAlert, 
  Wrench, 
  FileText, 
  Copy, 
  CheckCircle2,
  Coins,
  History
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";

interface RentalProduct {
  name: string;
}

interface RentalUser {
  fullName: string;
  email: string;
  phone: string;
}

interface RentalStructure {
  _id: string;
  status: "ACTIVE" | "COMPLETED" | "OVERDUE" | "PENDING";
  quantity: number;
  monthlyRent: number;
  securityDeposit: number;
  startDate: string | Date;
  endDate: string | Date;
  rentalTenure: number;
  extensionCount: number;
  damageStatus: string;
  damageCharges: number;
  maintenanceRequired: boolean;
  notes?: string;
  actualReturnDate?: string | Date;
  product?: RentalProduct;
  user?: RentalUser;
}

interface RentalDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: RentalStructure | null | undefined;
}

export default function RentalDetailsDialog({
  open,
  onOpenChange,
  rental,
}: RentalDetailsDialogProps) {
  const [now] = useState(() => Date.now());
  const [copiedId, setCopiedId] = useState(false);

  if (!rental) return null;

  const remainingDays = Math.max(
    0,
    Math.ceil((new Date(rental.endDate).getTime() - now) / (1000 * 60 * 60 * 24))
  );

  const handleCopyId = () => {
    navigator.clipboard.writeText(rental._id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl rounded-2xl p-6 border-slate-100 bg-slate-50/50 shadow-2xl gap-6 scrollbar-thin">
        
        {/* Modal Dynamic Branding Header */}
        <DialogHeader className="space-y-1 text-left pb-4 border-b border-slate-100 bg-white -mx-6 -mt-6 p-6 rounded-t-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#2563EB]">Lease Overview Contract</label>
              <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight">
                {rental.product?.name || "Rental Agreement"}
              </DialogTitle>
              <div className="flex items-center space-x-2 text-[12px] text-slate-400 font-medium">
                <span>Contract Reference:</span>
                <span className="font-mono text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60 inline-flex items-center gap-1">
                  {rental._id}
                  <button onClick={handleCopyId} type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
                    {copiedId ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </button>
                </span>
              </div>
            </div>
            <div className="shrink-0 sm:pt-4">
              <RentalStatusBadge status={rental.status} />
            </div>
          </div>
          <DialogDescription className="hidden">Detailed breakdown of current active item contracts.</DialogDescription>
        </DialogHeader>

        {/* Core Layout Panels Matrix Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          
          {/* Section 1: Customer Information Card */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-50 text-slate-800">
              <User className="h-4 w-4 text-[#2563EB] stroke-[2]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Customer Metrics</h3>
            </div>
            <div className="space-y-2 text-[13px]">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400">Primary Holder</p>
                <p className="font-semibold text-slate-800">{rental.user?.fullName || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Email Address</p>
                  <p className="font-medium text-slate-700 truncate" title={rental.user?.email}>{rental.user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Phone Network</p>
                  <p className="font-medium text-slate-700">{rental.user?.phone || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Financial Terms Card */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-50 text-slate-800">
              <Coins className="h-4 w-4 text-emerald-500 stroke-[2]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Financial Schedule</h3>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Monthly Rent Rate</p>
                  <p className="font-extrabold text-[#2563EB] text-base">{formatCurrency(rental.monthlyRent)}<span className="text-[11px] font-medium text-slate-400">/mo</span></p>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Security Escrow</p>
                  <p className="font-bold text-slate-800 text-[14px]">{formatCurrency(rental.securityDeposit)}</p>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-50/80">
                <p className="text-[11px] uppercase font-bold text-slate-400">Quantity Ordered</p>
                <p className="font-semibold text-slate-700">{rental.quantity} Unit(s) Allocated</p>
              </div>
            </div>
          </div>

          {/* Section 3: Timeline Management Block */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2 pb-1 border-b border-slate-50 text-slate-800">
              <CalendarDays className="h-4 w-4 text-amber-500 stroke-[2]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Lease Milestone Track</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-4 text-[13px]">
              <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Activation Date</p>
                <p className="font-semibold text-slate-700 mt-0.5">{formatDate(rental.startDate)}</p>
              </div>
              <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Target Maturity</p>
                <p className="font-semibold text-slate-800 mt-0.5">{formatDate(rental.endDate)}</p>
              </div>
              <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400">Agreed Tenure</p>
                <p className="font-bold text-slate-800 mt-0.5">{rental.rentalTenure} Month(s)</p>
              </div>
              <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400">Time Outstanding</p>
                <p className="font-extrabold text-[14px] text-amber-400 mt-0.5">
                  {rental.status === "COMPLETED" ? "Term Concluded" : `${remainingDays} Days Left`}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Maintenance & Incidents Column */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-50 text-slate-800">
              <ShieldAlert className="h-4 w-4 text-rose-500 stroke-[2]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Incidents & Damages</h3>
            </div>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between items-center bg-slate-50/40 p-2 rounded-lg border border-slate-100">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Status Classification</p>
                  <p className="font-semibold capitalize text-slate-700">{rental.damageStatus || "Clear / Inspected"}</p>
                </div>
                {rental.damageCharges > 0 && (
                  <span className="bg-rose-50 border border-rose-100 text-rose-600 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                    Levied
                  </span>
                )}
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400">Assessable Damage Toll</p>
                <p className={`font-bold text-[14px] ${rental.damageCharges > 0 ? "text-rose-600" : "text-slate-700"}`}>
                  {formatCurrency(rental.damageCharges)}
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Extensions & Logs Column */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-50 text-slate-800">
              <History className="h-4 w-4 text-indigo-500 stroke-[2]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">Lease Operations Log</h3>
            </div>
            <div className="space-y-3 text-[13px]">
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400">Cycles Extended</p>
                <p className="font-semibold text-slate-700">{rental.extensionCount} Lifecycle Multipliers</p>
              </div>
              
              <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Wrench className={`h-4 w-4 ${rental.maintenanceRequired ? "text-amber-500 animate-pulse" : "text-slate-400"}`} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Dispatched Engineering</p>
                  <p className="font-semibold text-slate-700 text-[12px]">
                    {rental.maintenanceRequired ? "Routine Request Pending" : "System Status Normal"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footnote: Notes & Return Timestamps */}
          <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm md:col-span-2 space-y-2 text-[13px]">
            <div className="flex items-center space-x-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <FileText className="h-3.5 w-3.5" />
              <span>Contractual Internal Ledger Notes</span>
            </div>
            <p className="text-slate-500 italic bg-slate-50/60 p-3 rounded-lg border border-slate-100 leading-relaxed">
              {rental.notes || "No standard operational amendments appended onto this specific asset agreement docket ledger."}
            </p>

            {rental.actualReturnDate && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-600 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100/60">
                <span className="font-bold text-emerald-800 text-[12px] uppercase">Final Off-Hiring Release Executed</span>
                <span className="font-mono text-emerald-700 font-bold text-[12px]">
                  {new Date(rental.actualReturnDate).toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}