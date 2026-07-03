"use client";

import { Search, SlidersHorizontal, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RentalFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function RentalFilters({
  search,
  setSearch,
  status,
  setStatus,
}: RentalFiltersProps) {
  const hasActiveFilters = search !== "" || status !== "all";

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  // Maps rental statuses to matching design system styles
  const statusStyles: Record<string, { bullet: string }> = {
    all: { bullet: "bg-slate-400" },
    UPCOMING: { bullet: "bg-blue-500" },
    ACTIVE: { bullet: "bg-emerald-500" },
    EXTENDED: { bullet: "bg-indigo-500" },
    RETURN_REQUESTED: { bullet: "bg-amber-500" },
    RETURNED: { bullet: "bg-slate-500" },
    CANCELLED: { bullet: "bg-rose-500" },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 transition-all duration-200">
      
      {/* Control Pane Subheading Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-slate-700">
          <SlidersHorizontal className="h-4 w-4 text-[#2563EB] stroke-[2.5]" />
          <span className="text-[13px] font-bold uppercase tracking-wider text-slate-800">
            Filter Controls
          </span>
        </div>
        
        {/* Dynamic Reset Component Anchor */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-[12px] font-bold text-rose-500 hover:text-rose-600 transition-colors inline-flex items-center space-x-1"
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>Clear Active Filters</span>
          </button>
        )}
      </div>

      {/* Input Field Control Elements Matrix */}
      <div className="grid gap-3 sm:grid-cols-3">
        
        {/* Search Field Element Block */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 stroke-[2]" />
          <Input
            type="text"
            placeholder="Search rentals by product title, ID, or customer details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 h-11 rounded-xl border-slate-200 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#2563EB] focus-visible:border-[#2563EB] shadow-sm transition-all"
          />
        </div>

        {/* Status Dropdown Picker Selector Container */}
        <div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-[14px] font-semibold text-slate-700 focus:ring-[#2563EB] focus:border-[#2563EB] shadow-sm transition-all">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-100 p-1 shadow-lg">
              
              <SelectItem value="all" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.all.bullet}`} />
                  <span>All Rental Orders</span>
                </div>
              </SelectItem>

              <SelectItem value="UPCOMING" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.UPCOMING.bullet}`} />
                  <span>Upcoming Leases</span>
                </div>
              </SelectItem>

              <SelectItem value="ACTIVE" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.ACTIVE.bullet}`} />
                  <span>Active Live Subscriptions</span>
                </div>
              </SelectItem>

              <SelectItem value="EXTENDED" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.EXTENDED.bullet}`} />
                  <span>Extended Cycles</span>
                </div>
              </SelectItem>

              <SelectItem value="RETURN_REQUESTED" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.RETURN_REQUESTED.bullet}`} />
                  <span>Return Requested</span>
                </div>
              </SelectItem>

              <SelectItem value="RETURNED" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.RETURNED.bullet}`} />
                  <span>Returned & Closed</span>
                </div>
              </SelectItem>

              <SelectItem value="CANCELLED" className="rounded-lg font-medium text-slate-700 py-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyles.CANCELLED.bullet}`} />
                  <span>Cancelled Orders</span>
                </div>
              </SelectItem>

            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}