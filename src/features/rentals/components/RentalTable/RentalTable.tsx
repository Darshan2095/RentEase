"use client";

import { useState } from "react";
import { Eye, RotateCcw, ChevronLeft, ChevronRight, Inbox, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { useRentals } from "../../hooks/useRentals";
import RentalStatusBadge, { RentalStatusType } from "../RentalStatusBadge/RentalStatusBadge";
import RentalDetailsDialog from "../RentalDetailsDialog/RentalDetailsDialog";
import ReturnRentalDialog from "../ReturnRentalDialog/ReturnRentalDialog";

interface Props {
  page: number;
  search: string;
  status: string;
  onPageChange: (page: number) => void;
}

export default function RentalTable({
  page,
  search,
  status,
  onPageChange,
}: Props) {
  const { data, isLoading } = useRentals({
    page,
    limit: 10,
    search,
    status: status === "all" ? "" : status,
  });

  const rentals = data?.data ?? [];
  const pagination = data?.pagination;

  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  // 1. Premium Loading View: Shimmer Row Matrix Simulation
  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-[#2563EB] animate-spin" />
          <span className="text-[13px] font-semibold text-slate-500 animate-pulse">Syncing order logs...</span>
        </div>
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="h-11 font-bold text-slate-800">Product</TableHead>
              <TableHead className="h-11 font-bold text-slate-800">Customer</TableHead>
              <TableHead className="h-11 font-bold text-slate-800">Rent</TableHead>
              <TableHead className="h-11 font-bold text-slate-800">Tenure</TableHead>
              <TableHead className="h-11 font-bold text-slate-800">End Date</TableHead>
              <TableHead className="h-11 font-bold text-slate-800">Status</TableHead>
              <TableHead className="h-11 text-right font-bold text-slate-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={`row-skel-${idx}`} className="border-b border-slate-50 hover:bg-transparent animate-pulse">
                <TableCell className="py-3.5"><div className="h-4 bg-slate-200 rounded w-32" /></TableCell>
                <TableCell className="py-3.5"><div className="h-4 bg-slate-200 rounded w-24" /></TableCell>
                <TableCell className="py-3.5"><div className="h-4 bg-slate-200 rounded w-16" /></TableCell>
                <TableCell className="py-3.5"><div className="h-4 bg-slate-200 rounded w-16" /></TableCell>
                <TableCell className="py-3.5"><div className="h-4 bg-slate-200 rounded w-20" /></TableCell>
                <TableCell className="py-3.5"><div className="h-6 bg-slate-200 rounded-full w-24" /></TableCell>
                <TableCell className="py-3.5 flex justify-end gap-2"><div className="h-8 w-8 bg-slate-200 rounded-lg" /><div className="h-8 w-8 bg-slate-200 rounded-lg" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      {/* Premium Table Content Layout Block */}
      <div className="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm transition-all duration-200">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Product</TableHead>
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Customer</TableHead>
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Monthly Rent</TableHead>
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Tenure</TableHead>
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Maturity Date</TableHead>
              <TableHead className="h-12 font-bold text-slate-800 text-[13px]">Status</TableHead>
              <TableHead className="h-12 text-right font-bold text-slate-800 text-[13px] pr-5">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-400">
                      <Inbox className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">No logs found</span>
                    <p className="text-[12px] text-slate-400 font-medium max-w-xs leading-normal">
                      We couldn't pull matching operational parameters matching this data query filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {rentals.map((rental: any) => (
              <TableRow 
                key={rental._id}
                className="border-b border-slate-100 hover:bg-slate-50/40 group transition-colors"
              >
                {/* Product Layout Identity Frame */}
                <TableCell className="py-3.5 font-semibold text-slate-900 text-[13.5px]">
                  <div className="flex flex-col">
                    <span>{rental.product?.name ?? "N/A"}</span>
                    <span className="text-[11px] font-medium text-slate-400 font-mono tracking-tight mt-0.5">
                      #{rental._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </TableCell>

                {/* Customer Details Node */}
                <TableCell className="py-3.5 font-medium text-slate-600 text-[13.5px]">
                  {rental.user?.fullName ?? "Unregistered Client"}
                </TableCell>

                {/* Local Currency Value Node */}
                <TableCell className="py-3.5 font-bold text-slate-800 text-[13.5px]">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(rental.monthlyRent)}
                  <span className="text-[11px] text-slate-400 font-medium font-sans">/mo</span>
                </TableCell>

                {/* Tenure Value Badge Anchor */}
                <TableCell className="py-3.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/40 text-[12px] font-semibold text-slate-600">
                    {rental.rentalTenure} Mos
                  </span>
                </TableCell>

                {/* Formatted Date Block */}
                <TableCell className="py-3.5 font-medium text-slate-500 text-[13px]">
                  {new Date(rental.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </TableCell>

                {/* Interactive Status Indicator Fragment */}
                <TableCell className="py-3.5">
                  <RentalStatusBadge status={rental.status as RentalStatusType} />
                </TableCell>

                {/* Action Buttons Interface Component */}
                <TableCell className="py-3.5 pr-5">
                  <div className="flex justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      onClick={() => {
                        setSelectedRental(rental);
                        setDetailsOpen(true);
                      }}
                      title="Inspect Lease Records"
                    >
                      <Eye className="h-4 w-4 stroke-[2]" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                      disabled={rental.status === "RETURNED" || rental.status === "COMPLETED"}
                      onClick={() => {
                        setSelectedRental(rental);
                        setReturnOpen(true);
                      }}
                      title="Initiate Return Workflow"
                    >
                      <RotateCcw className="h-4 w-4 stroke-[2]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Premium Refactored Pagination Interface Frame */}
      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-[13px] font-medium text-slate-500">
          Showing <span className="font-bold text-slate-700">{rentals.length}</span> entries 
          {pagination && ` (Page ${pagination.page} of ${pagination.totalPages})`}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1 rounded-xl font-medium border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Prev</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1 rounded-xl font-medium border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            disabled={page >= (pagination?.totalPages ?? 1)}
            onClick={() => onPageChange(page + 1)}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dialog Workflow Anchors */}
      <RentalDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        rental={selectedRental}
      />

      <ReturnRentalDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        rental={selectedRental}
      />
    </>
  );
}