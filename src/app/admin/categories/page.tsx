"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import CategoryTable from "@/features/categories/components/CategoryTable/CategoryTable";
import CategoryDialog from "@/features/categories/components/CategoryDialog/CategoryDialog";

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-muted-foreground">
            Manage product categories.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedCategory(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>

      </div>

      <CategoryTable
        onEdit={(category) => {
          setSelectedCategory(category);
          setOpen(true);
        }}
      />

      <CategoryDialog
        open={open}
        onOpenChange={setOpen}
        category={selectedCategory}
      />

    </div>
  );
}