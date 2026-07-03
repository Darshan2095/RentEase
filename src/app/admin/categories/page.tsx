"use client";

import { useState } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryTable from "@/features/categories/components/CategoryTable/CategoryTable";
import CategoryDialog from "@/features/categories/components/CategoryDialog/CategoryDialog";

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
            <p className="text-sm text-slate-500">
              Define the structure and taxonomy of your rental catalog.
            </p>
          </div>
        </div>

        <Button 
          onClick={() => {
            setSelectedCategory(null);
            setOpen(true);
          }}
          className="rounded-xl shadow-lg shadow-blue-600/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>

      {/* Main Content Area */}
      <CategoryTable
        onEdit={(category) => {
          setSelectedCategory(category);
          setOpen(true);
        }}
      />

      {/* Dialog for Add/Edit */}
      <CategoryDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedCategory(null);
        }}
        category={selectedCategory}
      />
    </div>
  );
}