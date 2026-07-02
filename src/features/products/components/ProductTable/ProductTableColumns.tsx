"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export interface ProductColumn {
  _id: string;
  name: string;
  category: string;
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
    header: () => (
      <Checkbox
        checked={allSelected}
        onCheckedChange={onToggleAll}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedRows[row.original._id] || false}
        onCheckedChange={() =>
          onToggleRow(row.original._id)
        }
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "monthlyRent",
    header: "Monthly Rent",
    cell: ({ row }) => `₹${row.original.monthlyRent}`,
  },
  {
    accessorKey: "securityDeposit",
    header: "Deposit",
    cell: ({ row }) => `₹${row.original.securityDeposit}`,
  },
  {
    accessorKey: "availableStock",
    header: "Stock",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) =>
      row.original.isFeatured ? (
        <Badge>Yes</Badge>
      ) : (
        <Badge variant="secondary">No</Badge>
      ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge className="bg-green-600">Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(row.original)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];