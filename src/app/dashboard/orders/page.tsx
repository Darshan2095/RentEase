"use client";

import { useState } from "react";
import { ShoppingBag, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { Button } from "@/components/ui/button";
import UserOrderCard from "@/features/orders/components/UserOrderCard/UserOrderCard";
import OrderDetailsDialog from "@/features/orders/components/OrderDetailsDialog/OrderDetailsDialog";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useOrders({
    page,
    limit: 6, // Optimized lower count grid footprint for user card tracking visibility
  });

  const orders = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // High-Fidelity Client Grid Card Skeleton Preloaders
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-pulse">
        <div className="space-y-2.5">
          <div className="h-7 bg-slate-200 rounded-lg w-48" />
          <div className="h-4 bg-slate-100 rounded-md w-64" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-[210px] rounded-2xl border border-slate-100 bg-slate-50/40 p-5 space-y-4" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 min-h-[75vh]">
      
      {/* Title Layout Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-900 text-white shrink-0 shadow-sm">
              <ShoppingBag className="h-5 w-5 stroke-[2]" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Rental Orders History
            </h1>
          </div>
          <p className="text-[14px] text-slate-500 font-medium pl-10">
            Monitor dynamic lease distributions, tracking schedules, and active asset cycles.
          </p>
        </div>
      </div>

      {/* Structured Empty View Layout Component */}
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center max-w-md mx-auto shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100">
            <Inbox className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900">No active leases found</h3>
          <p className="mt-1 text-sm text-slate-500 leading-normal">
            You haven&apos;t requested any furniture items or home appliances yet. Browse the marketplace catalog to start your setup!
          </p>
        </div>
      ) : (
        <>
          {/* Main Content Card Layout Grid Area */}
          <div className="grid gap-5 sm:grid-cols-2 items-start">
            {orders.map((order: any) => (
              <UserOrderCard
                key={order._id}
                order={order}
                onView={(item) => {
                  setSelectedOrder(item);
                  setOpen(true);
                }}
              />
            ))}
          </div>

          {/* Integrated Multi-Page History Control Pagination Row */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2">
              <p className="text-[13px] text-slate-500 font-medium">
                Showing page <span className="text-slate-900 font-bold">{currentPage}</span> of{" "}
                <span className="text-slate-900 font-bold">{totalPages}</span> index blocks
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold text-[13px] inline-flex items-center space-x-1 disabled:opacity-40 transition-all"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                  <span>Prev</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold text-[13px] inline-flex items-center space-x-1 disabled:opacity-40 transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Overlay Blueprint Modals Layer */}
      <OrderDetailsDialog
        open={open}
        onOpenChange={setOpen}
        order={selectedOrder}
      />
    </div>
  );
}