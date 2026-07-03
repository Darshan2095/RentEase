"use client";

import { useState } from "react";
import { Eye, Pencil, Inbox, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "../../hooks/useOrders";

import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import OrderDetailsDialog from "../OrderDetailsDialog/OrderDetailsDialog";
import UpdateOrderStatusDialog from "../UpdateOrderStatusDialog/UpdateOrderStatusDialog";

interface Props {
  page: number;
  search: string;
  status: string;
  onPageChange: (page: number) => void;
}

export default function OrderTable({
  page,
  search,
  status,
  onPageChange,
}: Props) {
  const { data, isLoading } = useOrders({
    page,
    limit: 10,
    search,
    status,
  });

  const orders = data?.data ?? [];
  const pagination = data?.pagination;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Helper function to map payment statuses to clean visual badges
  const getPaymentBadgeStyle = (payStatus: string) => {
    const normalize = payStatus?.toLowerCase() || "";
    if (normalize.includes("paid") || normalize.includes("success")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    }
    if (normalize.includes("pend") || normalize.includes("process")) {
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    }
    return "bg-rose-50 text-rose-700 border-rose-200/60";
  };

  // High-Fidelity Skeleton Rows Loader
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 h-12 w-full animate-pulse" />
        <div className="divide-y divide-slate-100">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between space-x-4 animate-pulse">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200/80 rounded w-1/4" />
                <div className="h-3 bg-slate-100 rounded w-1/3" />
              </div>
              <div className="h-8 bg-slate-200/60 rounded w-20" />
              <div className="h-8 bg-slate-100 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;

  return (
    <>
      {/* Table Canvas Boundary Frame Container */}
      <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm shadow-slate-100/40">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/70 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Order reference</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Client Profile</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Asset Count</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Financial Gross</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Payment Flow</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Logistics Stage</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide">Registered On</TableHead>
                <TableHead className="text-[#111827] font-bold py-3.5 text-[13px] tracking-wide text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-slate-100/80">
              {orders.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={8} className="py-14 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
                      <div className="p-3 bg-slate-50 text-slate-400 rounded-full border border-slate-100">
                        <Inbox className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[15px] text-[#111827]">No results matched filters</p>
                        <p className="text-[13px] text-[#6B7280]">
                          Try adjusting your search queries or lifecycle parameter dropdown choices to expand the filter range.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order: any) => (
                  <TableRow 
                    key={order._id}
                    className="hover:bg-slate-50/40 transition-colors duration-150 group"
                  >
                    {/* Order Reference Hash */}
                    <TableCell className="font-mono text-[13px] font-semibold text-[#111827] py-4">
                      <span className="text-slate-400 font-normal">#</span>
                      {order._id.slice(-6).toUpperCase()}
                    </TableCell>

                    {/* Client Profile Identity details block */}
                    <TableCell className="py-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-[14px] text-[#111827] tracking-tight">
                          {order.user?.fullName || "Guest Account"}
                        </p>
                        <p className="text-[12px] text-[#6B7280]">
                          {order.user?.email || "No contact verified"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Manifest Item Count */}
                    <TableCell className="py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-[#111827] text-[12px] font-medium">
                        {order.items?.length || 0} Item(s)
                      </span>
                    </TableCell>

                    {/* Formatted Total Cost calculation */}
                    <TableCell className="font-bold text-[14px] text-[#111827] py-4">
                      ₹{(order.total ?? 0).toLocaleString()}
                    </TableCell>

                    {/* Payment State Status Badge tracking */}
                    <TableCell className="py-4">
                      <Badge 
                        variant="outline" 
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${getPaymentBadgeStyle(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    {/* Fulfillment Workflow Progress Stage */}
                    <TableCell className="py-4">
                      <OrderStatusBadge status={order.orderStatus} />
                    </TableCell>

                    {/* Localized Registered Date timestamp */}
                    <TableCell className="text-[13px] text-[#6B7280] font-medium py-4">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </TableCell>

                    {/* Modular Action Triggers panel */}
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-[#2563EB] shadow-sm transition-all"
                          onClick={() => {
                            setSelectedOrder(order);
                            setDetailsOpen(true);
                          }}
                          title="View Specifications"
                        >
                          <Eye className="h-3.5 w-3.5 stroke-[2]" />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-amber-600 shadow-sm transition-all"
                          onClick={() => {
                            setSelectedOrder(order);
                            setStatusOpen(true);
                          }}
                          title="Edit Stage Status"
                        >
                          <Pencil className="h-3.5 w-3.5 stroke-[2]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Structured Pagination Navigation Bar footer operational row */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
        <p className="text-[13px] text-[#6B7280] font-medium order-2 sm:order-1">
          Showing page <span className="text-[#111827] font-bold">{currentPage}</span> of{" "}
          <span className="text-[#111827] font-bold">{totalPages}</span> total blocks
        </p>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:text-[#111827] hover:bg-slate-50 font-semibold text-[13px] inline-flex items-center space-x-1 disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2]" />
            <span>Previous</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:text-[#111827] hover:bg-slate-50 font-semibold text-[13px] inline-flex items-center space-x-1 disabled:opacity-40 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          </Button>
        </div>
      </div>

      {/* Component Dialog State Overlays mapping modules */}
      <OrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        order={selectedOrder}
      />

      <UpdateOrderStatusDialog
        open={statusOpen}
        onOpenChange={setStatusOpen}
        order={selectedOrder}
      />
    </>
  );
}