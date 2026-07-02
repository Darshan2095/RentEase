"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CategoryForm from "../CategoryForm/CategoryForm";

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
}: any) {
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
          category={category}
          onSuccess={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}