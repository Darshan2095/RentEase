"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useProducts } from "../../hooks/useProducts";
import { getProductColumns, ProductColumn } from "./ProductTableColumns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface ProductTableProps {
  page?: number;
  search?: string;
  category?: string;
  featured?: string;
  sort?: string;
  products?: ProductColumn[];
  selectedRows?: Record<string, boolean>;
  onToggleRow?: (id: string) => void;
  onToggleAll?: () => void;
  allSelected?: boolean;
  onEdit: (product: ProductColumn) => void;
  onDelete: (product: ProductColumn) => void;
}

export default function ProductTable({
  page = 1, search = "", category = "all", featured = "all", sort = "-createdAt",
  products: providedProducts, selectedRows = {}, onToggleRow = () => {},
  onToggleAll = () => {}, allSelected = false, onEdit, onDelete,
}: ProductTableProps) {
  const { data, isLoading } = useProducts({ page, limit: 10, search, category: category === "all" ? "" : category, featured: featured === "all" ? undefined : featured === "true", sort });

  const products = data?.data ?? [];
  const rows = providedProducts ?? products;

  const table = useReactTable({
    data: rows,
    columns: getProductColumns({ onEdit, onDelete, selectedRows, onToggleRow, onToggleAll, allSelected }),
    getCoreRowModel: getCoreRowModel(),
  });

  // Premium Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Premium Empty State
  if (rows.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
        <p className="font-medium">No products found</p>
        <p className="text-sm">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="group transition-colors hover:bg-slate-50">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-4 text-sm text-slate-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
