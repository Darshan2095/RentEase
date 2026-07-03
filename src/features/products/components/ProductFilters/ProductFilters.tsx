"use client";

import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  featured: string;
  setFeatured: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  categories: any[];
}

export default function ProductFilters({
  search, setSearch, category, setCategory, featured, setFeatured, sort, setSort, categories,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 p-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
      
      {/* Search Input with Leading Icon */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search catalog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 border-slate-200 focus-visible:ring-blue-500 rounded-xl"
        />
      </div>

      {/* Filter Selects: Using compact sizing and icons */}
      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[140px] h-11 rounded-xl border-slate-200">
            <Filter className="h-3.5 w-3.5 mr-2 text-slate-400" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[140px] h-11 rounded-xl border-slate-200">
            <ArrowDownUp className="h-3.5 w-3.5 mr-2 text-slate-400" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Latest First</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="monthlyRent">Price: Low to High</SelectItem>
            <SelectItem value="-monthlyRent">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
    </div>
  );
}