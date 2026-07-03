"use client";

import { Badge } from "@/components/ui/badge";

// High-fidelity configuration structure mapping states to premium brand color schemes
const statusStyles = {
  PLACED: {
    className: "bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-50/80",
    dotColor: "bg-blue-500",
    label: "Order Placed",
  },
  CONFIRMED: {
    className: "bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-50/80",
    dotColor: "bg-indigo-500",
    label: "Confirmed",
  },
  SHIPPED: {
    className: "bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-50/80",
    dotColor: "bg-amber-500",
    label: "Dispatched",
  },
  DELIVERED: {
    className: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-50/80",
    dotColor: "bg-emerald-500",
    label: "Delivered",
  },
  ACTIVE: {
    className: "bg-teal-50 text-teal-700 border-teal-200/80 hover:bg-teal-50/80",
    dotColor: "bg-teal-500",
    label: "Active Lease",
  },
  RETURNED: {
    className: "bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-50/80",
    dotColor: "bg-purple-500",
    label: "Asset Returned",
  },
  CANCELLED: {
    className: "bg-rose-50 text-rose-700 border-rose-200/80 hover:bg-rose-50/80",
    dotColor: "bg-rose-500",
    label: "Cancelled",
  },
} as const;

export default function OrderStatusBadge({
  status,
}: {
  status: keyof typeof statusStyles;
}) {
  // Graceful fallback config if an unknown index token keys into the component runtime
  const activeStyle = statusStyles[status] || {
    className: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-50/80",
    dotColor: "bg-slate-400",
    label: status,
  };

  return (
    <Badge 
      variant="outline" 
      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full font-semibold text-[12px] tracking-wide shadow-sm/5 transition-colors duration-150 border uppercase ${activeStyle.className}`}
    >
      {/* Decorative Animated Status Pulse Node Core */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status === "SHIPPED" || status === "PLACED" ? (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeStyle.dotColor}`} />
        ) : null}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${activeStyle.dotColor}`} />
      </span>
      
      <span>{activeStyle.label}</span>
    </Badge>
  );
}