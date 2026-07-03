"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ProductColumn {
  _id: string;
  name: string;
  category: string | CategoryType;
  monthlyRent: number;
  securityDeposit: number;
  availableStock: number;
  isFeatured: boolean;
  isActive: boolean;
  slug: string;
}



export interface ProductTableProps {

  onEdit: (product: ProductColumn) => void;

  onDelete: (product: ProductColumn) => void;

  selectedRows: Record<string, boolean>;

  onToggleRow: (id: string) => void;

  onToggleAll: () => void;

  allSelected: boolean;

}
export const getProductColumns = ({
  onEdit,
  onDelete,
  selectedRows,
  onToggleRow,
  onToggleAll,
  allSelected,
}: ProductTableProps): ColumnDef<ProductColumn>[] => [
  {
    id: "select",
    header: () => <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />,
    cell: ({ row }) => (
      <Checkbox
        checked={selectedRows[row.original._id] || false}
        onCheckedChange={() => onToggleRow(row.original._id)}
      />
    ),
    size: 40,
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.name}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-slate-500">
        {typeof row.original.category === "string" 
          ? row.original.category 
          : row.original.category?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "monthlyRent",
    header: "Monthly Rent",
    cell: ({ row }) => (
      <span className="font-mono font-medium text-slate-900">
        ₹{row.original.monthlyRent.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "availableStock",
    header: "Stock",
    cell: ({ row }) => (
      <div className={cn(
        "font-medium",
        row.original.availableStock < 5 ? "text-rose-600" : "text-slate-700"
      )}>
        {row.original.availableStock}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"} className={cn(
        row.original.isActive ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20" : ""
      )}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(row.original)}>
          <Pencil className="h-4 w-4 text-slate-500" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-rose-600" onClick={() => onDelete(row.original)}>
          <Trash2 className="h-4 w-4 text-slate-500" />
        </Button>
      </div>
    ),
  },
];