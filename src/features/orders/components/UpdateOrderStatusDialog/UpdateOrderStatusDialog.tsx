"use client";

import { useState, useEffect } from "react";
import { Loader2, ClipboardList, CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useUpdateOrderStatus } from "../../hooks/useUpdateOrderStatus";

interface UpdateOrderStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
}

export default function UpdateOrderStatusDialog({
  open,
  onOpenChange,
  order,
}: UpdateOrderStatusDialogProps) {
  const [status, setStatus] = useState("");
  const mutation = useUpdateOrderStatus();

  // Crucial Sync Fix: Ensures state syncs perfectly when a new order selection is targeted
  useEffect(() => {
    if (order?.orderStatus) {
      setStatus(order.orderStatus);
    }
  }, [order, open]);

  const handleUpdate = () => {
    if (!order?._id) return;

    mutation.mutate(
      {
        id: order._id,
        status,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  // Status dot indicators mirroring our platform badge theme
  const statusDots: Record<string, string> = {
    PLACED: "bg-blue-500",
    CONFIRMED: "bg-indigo-500",
    SHIPPED: "bg-amber-500",
    DELIVERED: "bg-emerald-500",
    RETURNED: "bg-purple-500",
    CANCELLED: "bg-rose-500",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl p-6 gap-6 border-slate-100 bg-white shadow-2xl">
        
        {/* Context-Aware Header Suite */}
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center space-x-2 text-slate-500">
            <ClipboardList className="h-4 w-4" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase bg-slate-100 px-2 py-0.5 rounded">
              #{order?._id?.slice(-6).toUpperCase() ?? "000000"}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-[#111827]">
            Modify Lifecycle Phase
          </DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500 leading-normal">
            Transitioning this rental contract routes live logistical milestones to{" "}
            <span className="font-semibold text-slate-900">{order?.user?.fullName || "the client"}</span>.
          </DialogDescription>
        </DialogHeader>

        {/* Operational Status Dropdown Block */}
        <div className="space-y-2">
          <label className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
            Fulfillment Stage
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 text-[14px] font-medium focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
              <SelectValue placeholder="Select updated status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-100 p-1 shadow-xl">
              {[
                { value: "PLACED", label: "Placed" },
                { value: "CONFIRMED", label: "Confirmed" },
                { value: "SHIPPED", label: "Shipped" },
                { value: "DELIVERED", label: "Delivered" },
                { value: "RETURNED", label: "Returned" },
                { value: "CANCELLED", label: "Cancelled" },
              ].map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="rounded-lg text-[13px] py-2 font-medium cursor-pointer focus:bg-slate-50 text-slate-700"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`h-2 w-2 rounded-full ${statusDots[item.value] || "bg-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Structured Secondary Controls Section */}
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-100"
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpdate}
            disabled={mutation.isPending || status === order?.orderStatus}
            className="rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-semibold shadow-md shadow-blue-500/10 min-w-[130px] flex items-center justify-center space-x-1.5 transition-all duration-150 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                <span>Apply Status</span>
              </>
            )}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}