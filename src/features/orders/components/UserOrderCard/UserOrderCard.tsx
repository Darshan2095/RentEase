"use client";

import { Package, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";

interface OrderItem {
  product?: {
    name: string;
    images?: string[];
  };
}

interface OrderStructure {
  _id: string;
  createdAt: string;
  orderStatus: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "ACTIVE" | "RETURNED" | "CANCELLED";
  items: OrderItem[];
  total: number;
}

interface UserOrderCardProps {
  order: OrderStructure;
  onView: (order: OrderStructure) => void;
}

export default function UserOrderCard({ order, onView }: UserOrderCardProps) {
  const itemsList = order?.items ?? [];
  const firstItem = itemsList[0];
  const itemThumbnail = firstItem?.product?.images?.[0];

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-200 flex flex-col justify-between space-y-5">
      
      {/* Top Meta Details Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
            Reference #{order?._id?.slice(-6).toUpperCase() ?? "000000"}
          </span>
          <div className="flex items-center text-[13px] text-slate-500 font-medium pt-1">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400 stroke-[2]" />
            <span>
              {order?.createdAt 
                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Date Unknown"}
            </span>
          </div>
        </div>

        {/* Dynamic Client Status Badge Component */}
        <div className="shrink-0">
          <OrderStatusBadge status={order?.orderStatus ?? "PLACED"} />
        </div>
      </div>

      {/* Main Focus Asset Information Row */}
      <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100/60">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/80 overflow-hidden shadow-inner">
          {itemThumbnail ? (
            <img 
              src={itemThumbnail} 
              alt={firstItem?.product?.name || "Asset"} 
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <Package className="h-5 w-5 text-slate-400 stroke-[1.5]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[14px] text-slate-900 truncate tracking-tight">
            {firstItem?.product?.name || "Unspecified Rental Item"}
          </p>
          <p className="text-[12px] font-medium text-slate-500 mt-0.5">
            {itemsList.length <= 1 
              ? "Single active asset lease" 
              : `Included with +${itemsList.length - 1} other assets`}
          </p>
        </div>
      </div>

      {/* Action and Pricing Footer Row */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100/50">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Monthly Cost
          </p>
          <p className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
            ₹{(order?.total ?? 0).toLocaleString("en-IN")}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(order)}
          className="h-9 px-4 rounded-xl border-slate-200 bg-white font-semibold text-[13px] text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-150 shadow-sm flex items-center space-x-1"
        >
          <span>View Details</span>
          <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </div>

    </div>
  );
}