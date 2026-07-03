"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, ShieldCheck, Hammer, Sparkles } from "lucide-react";
import { useReturnRental } from "../../hooks/useReturnRental";

interface ReturnRentalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: any;
}

export default function ReturnRentalDialog({
  open,
  onOpenChange,
  rental,
}: ReturnRentalDialogProps) {
  const mutation = useReturnRental();

  const [damageStatus, setDamageStatus] = useState("NONE");
  const [damageCharges, setDamageCharges] = useState<number>(0);
  const [notes, setNotes] = useState("");

  if (!rental) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDamageStatus("NONE");
      setDamageCharges(0);
      setNotes("");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    mutation.mutate(
      {
        id: rental._id,
        damageStatus,
        damageCharges,
        notes,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
      }
    );
  };

  // Dynamic visual indicators based on damage severity levels
  const getSeverityContext = () => {
    switch (damageStatus) {
      case "MINOR":
        return {
          banner: "bg-amber-50/70 border-amber-200 text-amber-800",
          icon: Hammer,
          iconColor: "text-amber-500"
        };
      case "MAJOR":
        return {
          banner: "bg-rose-50/70 border-rose-200 text-rose-800 animate-pulse-subtle",
          icon: AlertCircle,
          iconColor: "text-rose-500"
        };
      default:
        return {
          banner: "bg-emerald-50/60 border-emerald-100 text-emerald-800",
          icon: ShieldCheck,
          iconColor: "text-emerald-600"
        };
    }
  };

  const severity = getSeverityContext();
  const DamageStatusIcon = severity.icon;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl border-slate-100 p-6 gap-0 shadow-xl overflow-hidden">
        
        {/* Header Block Section */}
        <DialogHeader className="mb-5">
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Asset Intake Protocol
          </DialogTitle>
          <DialogDescription className="text-[13px] text-slate-400 font-medium">
            Review product evaluation parameters to officially log the off-hire return.
          </DialogDescription>
        </DialogHeader>

        {/* Immersive Asset Information Panel */}
        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 mb-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono">
              Lease Item
            </span>
            <h4 className="text-[14px] font-bold text-slate-800 leading-tight">
              {rental.product?.name ?? "Premium Catalog Asset"}
            </h4>
            <p className="text-[12px] text-slate-500 font-medium">
              Client: <span className="text-slate-700 font-semibold">{rental.user?.fullName ?? "N/A"}</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono block">
              Contract Ref
            </span>
            <span className="text-[12px] font-mono font-bold text-slate-600 bg-white border border-slate-200/60 px-2 py-0.5 rounded-md shadow-sm">
              #{rental._id?.slice(-6).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Operational Form Workspace Matrix */}
        <div className="space-y-4 mb-6">
          
          {/* Damage Dropdown Input Segment */}
          <div className="space-y-1.5">
            <Label className="text-[12.5px] font-bold text-slate-700">
              Condition & Damage Assessment
            </Label>
            <Select value={damageStatus} onValueChange={setDamageStatus}>
              <SelectTrigger className="h-10.5 rounded-xl border-slate-200 text-[13.5px] font-semibold text-slate-700 bg-white focus:ring-[#2563EB] shadow-sm transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-lg p-1">
                <SelectItem value="NONE" className="rounded-lg font-medium text-slate-700 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    No Damage (Perfect Order Return)
                  </div>
                </SelectItem>
                <SelectItem value="MINOR" className="rounded-lg font-medium text-slate-700 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Minor Scratches / Superficial Wear
                  </div>
                </SelectItem>
                <SelectItem value="MAJOR" className="rounded-lg font-medium text-slate-700 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                    Major Breakage / Structural Integrity Loss
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Severity Banner */}
          <div className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border text-[12px] font-medium transition-all duration-300 ${severity.banner}`}>
            <DamageStatusIcon className={`h-4 w-4 shrink-0 mt-0.5 ${severity.iconColor}`} />
            <div>
              {damageStatus === "NONE" && "Asset condition verified intact. Safe to reverse security hold logs."}
              {damageStatus === "MINOR" && "Superficial flaws. Check if repair fees are required to clear asset processing."}
              {damageStatus === "MAJOR" && "Critical unit failure. High-risk condition flags active. Assess complete structure restoration expenses."}
            </div>
          </div>

          {/* Currency Input Field Block */}
          <div className="space-y-1.5">
            <Label className="text-[12.5px] font-bold text-slate-700">
              Damage Recovery Penalty Charges
            </Label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="text-slate-400 font-semibold text-[14px]">₹</span>
              </div>
              <Input
                type="number"
                min={0}
                value={damageCharges === 0 ? "" : damageCharges}
                placeholder="0 (No additional recovery overheads)"
                onChange={(e) => setDamageCharges(Math.max(0, Number(e.target.value)))}
                className="pl-8 h-10.5 rounded-xl border-slate-200 text-[14px] font-bold text-slate-800 focus-visible:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* Form Notes Area Segment */}
          <div className="space-y-1.5">
            <Label className="text-[12.5px] font-bold text-slate-700">
              Technical Intake Logs / Inspection Notes
            </Label>
            <Textarea
              rows={3}
              value={notes}
              placeholder="Provide a brief statement regarding item quality, missing hardware or pickup notes..."
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl border-slate-200 text-[13.5px] font-medium text-slate-700 placeholder:text-slate-400 focus-visible:ring-[#2563EB] shadow-sm resize-none"
            />
          </div>

        </div>

        {/* Modal Action Options Layer Footer */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            className="rounded-xl font-semibold border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors h-11"
          >
            Abort Intake
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all h-11 px-5"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-400" />
                <span>Processing Record...</span>
              </>
            ) : (
              <span>Finalize Unit Intake</span>
            )}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}