"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useProducts } from "../../hooks/useProducts";
import {
  getProductColumns,
  ProductColumn,
} from "./ProductTableColumns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  page = 1,
  search = "",
  category = "all",
  featured = "all",
  sort = "-createdAt",
  products: providedProducts,
  selectedRows = {},
  onToggleRow = () => {},
  onToggleAll = () => {},
  allSelected = false,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const { data, isLoading } = useProducts({
    page,
    limit: 10,
    search,
    category: category === "all" ? "" : category,
    featured:
      featured === "all"
        ? undefined
        : featured === "true",
    sort,
  });

  const products = data?.data ?? [];
  const rows = providedProducts ?? products;

  const table = useReactTable({
    data: rows,
    columns: getProductColumns({
      onEdit,
      onDelete,
      selectedRows,
      onToggleRow,
      onToggleAll,
      allSelected,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">

      <Table>

        <TableHeader>

          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>

              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>

                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                </TableHead>
              ))}

            </TableRow>
          ))}

        </TableHeader>

        <TableBody>

          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>

              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>

                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}

                </TableCell>
              ))}

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </div>
  );
}
