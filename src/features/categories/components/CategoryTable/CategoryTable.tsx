"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";

import { useCategories } from "../../hooks/useCategories";

export default function CategoryTable({
  onEdit,
}: {
  onEdit: (category: any) => void;
}) {
  const { data = [], isLoading } = useCategories();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rounded-lg border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Name</TableHead>

            <TableHead>Slug</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Action</TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {data.map((category: any) => (
            <TableRow key={category._id}>

              <TableCell>{category.name}</TableCell>

              <TableCell>{category.slug}</TableCell>

              <TableCell>
                {category.isActive ? "Active" : "Inactive"}
              </TableCell>

              <TableCell>

                <Button
                  size="icon"
                  variant="outline"
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