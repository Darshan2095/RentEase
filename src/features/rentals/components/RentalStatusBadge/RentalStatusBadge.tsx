"use client";

import { 
  Clock3, 
  CheckCircle2, 
  RefreshCcw, 
  RotateCcw, 
  Ban, 
  AlertTriangle, 
  FileClock 
} from "lucide-react";
import { cn } from "@/lib/utils";

export type RentalStatusType =
  | "UPCOMING"
  | "ACTIVE"
  | "EXTENDED"
  | "RETURN_REQUESTED"
  | "RETURNED"
  | "CANCELLED"
  | "PENDING"
  | "COMPLETED"
  | "OVERDUE";

interface RentalStatusBadgeProps {
  status: RentalStatusType;
  className?: string;
}

// Custom luxury UI map configuration using distinct contextual styling vectors
const STATUS_THEME_ENGINE = {
  PENDING: {
    label: "Awaiting Verification",
    bgClass: "bg-amber-50 border-amber-200/60 text-amber-700",
    iconColor: "text-amber-500",
    icon: FileClock,
  },
  UPCOMING: {
    label: "Lease Confirmed",
    bgClass: "bg-blue-50 border-blue-200/60 text-blue-700",
    iconColor: "text-blue-500",
    icon: Clock3,
  },
  ACTIVE: {
    label: "Live Subscription",
    bgClass: "bg-emerald-50 border-emerald-200/60 text-emerald-800",
    iconColor: "text-emerald-600",
    icon: CheckCircle2,
  },
  EXTENDED: {
    label: "Contract Renewed",
    bgClass: "bg-indigo-50 border-indigo-200/60 text-indigo-700",
    iconColor: "text-indigo-500",
    icon: RefreshCcw,
  },
  RETURN_REQUESTED: {
    label: "Return Dispatching",
    bgClass: "bg-purple-50 border-purple-200/60 text-purple-700",
    iconColor: "text-purple-500",
    icon: RotateCcw,
  },
  RETURNED: {
    label: "Asset Reclaimed",
    bgClass: "bg-slate-100 border-slate-200 text-slate-700",
    iconColor: "text-slate-500",
    icon: CheckCircle2,
  },
  COMPLETED: {
    label: "Account Concluded",
    bgClass: "bg-slate-900 border-slate-950 text-slate-100",
    iconColor: "text-slate-400",
    icon: CheckCircle2,
  },
  OVERDUE: {
    label: "Maturity Breach",
    bgClass: "bg-rose-50 border-rose-200/60 text-rose-700 animate-pulse",
    iconColor: "text-rose-600",
    icon: AlertTriangle,
  },
  CANCELLED: {
    label: "Void Contract",
    bgClass: "bg-slate-50 border-slate-200 text-slate-400 line-through",
    iconColor: "text-slate-300",
    icon: Ban,
  },
};

export default function RentalStatusBadge({ status, className }: RentalStatusBadgeProps) {
  // Graceful configuration extraction with runtime safety fallback validation
  const currentConfig = STATUS_THEME_ENGINE[status] ?? STATUS_THEME_ENGINE.UPCOMING;
  const StatusIcon = currentConfig.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold border tracking-tight shadow-sm/5 select-none transition-all duration-300 whitespace-nowrap",
        currentConfig.bgClass,
        className
      )}
    >
      <StatusIcon className={cn("h-3.5 w-3.5 shrink-0 stroke-[2.5]", currentConfig.iconColor)} />
      <span>{currentConfig.label}</span>
    </span>
  );
}