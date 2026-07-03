"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";

export default function CategoryTable({ onEdit }: { onEdit: (category: any) => void }) {
  const { data = [], isLoading } = useCategories();

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-slate-900">Name</TableHead>
            <TableHead className="font-semibold text-slate-900">Slug</TableHead>
            <TableHead className="font-semibold text-slate-900">Status</TableHead>
            <TableHead className="text-right font-semibold text-slate-900">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category: any) => (
            <TableRow key={category._id} className="group hover:bg-slate-50/50">
              <TableCell className="font-medium text-slate-900">{category.name}</TableCell>
              <TableCell className="text-slate-500 font-mono text-xs">{category.slug}</TableCell>
              <TableCell>
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                  onClick={() => onEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}