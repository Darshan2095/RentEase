"use client";

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
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <Input
        placeholder="Search rental..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="all">
            All Rentals
          </SelectItem>

          <SelectItem value="UPCOMING">
            Upcoming
          </SelectItem>

          <SelectItem value="ACTIVE">
            Active
          </SelectItem>

          <SelectItem value="EXTENDED">
            Extended
          </SelectItem>

          <SelectItem value="RETURN_REQUESTED">
            Return Requested
          </SelectItem>

          <SelectItem value="RETURNED">
            Returned
          </SelectItem>

          <SelectItem value="CANCELLED">
            Cancelled
          </SelectItem>

        </SelectContent>

      </Select>

    </div>
  );
}