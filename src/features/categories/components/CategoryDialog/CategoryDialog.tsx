"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CategoryForm from "../CategoryForm/CategoryForm";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: {
    name?: string;
    slug?: string;
    icon?: string;
    description?: string;
  } | null;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const isEditing = !!category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* sm:max-w-lg keeps the form focused and prevents it from feeling too wide */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the details for this category to reflect in the catalog." 
              : "Create a new category to organize your rental products."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <CategoryForm
            defaultValues={category || undefined}
            onSubmit={(data) => {
              console.log("Submitting:", data);
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}