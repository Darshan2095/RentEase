"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderFilters({
  search,
  setSearch,
  status,
  setStatus,
}: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <Input
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>

          <SelectItem value="all">
            All Orders
          </SelectItem>

          <SelectItem value="PLACED">
            Placed
          </SelectItem>

          <SelectItem value="CONFIRMED">
            Confirmed
          </SelectItem>

          <SelectItem value="SHIPPED">
            Shipped
          </SelectItem>

          <SelectItem value="DELIVERED">
            Delivered
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