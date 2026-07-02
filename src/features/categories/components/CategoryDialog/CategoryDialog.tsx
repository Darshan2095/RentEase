"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  const defaultValues = category
    ? {
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        description: category.description,
      }
    : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>

        </DialogHeader>

        <CategoryForm
          defaultValues={defaultValues}
          onSubmit={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}