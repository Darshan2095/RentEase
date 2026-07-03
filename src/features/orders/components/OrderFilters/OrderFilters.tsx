"use client";

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function OrderFilters({
  search,
  setSearch,
  status,
  setStatus,
}: OrderFiltersProps) {
  
  // Quick dynamic check to show the clear button instantly when state parameters diverge from normal defaults
  const isFilterActive = search !== "" || (status !== "all" && status !== "");

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
  };

  // Status mapping to display small custom color dots matching our status patterns
  const statusColors: Record<string, string> = {
    all: "bg-slate-400",
    PLACED: "bg-blue-400",
    CONFIRMED: "bg-indigo-400",
    SHIPPED: "bg-amber-400",
    DELIVERED: "bg-emerald-400",
    RETURNED: "bg-purple-400",
    CANCELLED: "bg-rose-400",
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-200">
      
      {/* High-Fidelity Icon-Anchored Search Input Wrapper */}
      <div className="relative flex-1 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-150" />
        <Input
          placeholder="Search customer by name, email, or string index..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 w-full rounded-xl border-slate-200 bg-slate-50/30 focus-visible:bg-white focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] placeholder:text-slate-400 text-[14px] transition-all duration-150"
        />
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-md flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Styled Status Controller Block */}
      <div className="w-full sm:w-[220px] shrink-0">
        <Select value={status || "all"} onValueChange={setStatus}>
          <SelectTrigger className="h-10 w-full rounded-xl border-slate-200 bg-slate-50/30 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-[14px] font-medium text-slate-700">
            <div className="flex items-center space-x-2 text-left">
              <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>

          <SelectContent className="rounded-xl border-slate-100 shadow-xl shadow-slate-200/50 p-1">
            {[
              { value: "all", label: "All Orders" },
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
                className="rounded-lg text-[13px] py-2 font-medium cursor-pointer focus:bg-slate-50 focus:text-[#111827]"
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`h-2 w-2 rounded-full ${statusColors[item.value] || "bg-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Conditional Reset Actions Toggle Element */}
      {isFilterActive && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="h-10 px-3.5 rounded-xl text-[13px] font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 self-end sm:self-auto transition-all duration-200"
        >
          <X className="h-4 w-4 mr-1.5 stroke-[2.5]" />
          <span>Clear Filters</span>
        </Button>
      )}

    </div>
  );
}