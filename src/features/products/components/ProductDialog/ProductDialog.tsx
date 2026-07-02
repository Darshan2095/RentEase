"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "../ProductForm/ProductForm";
import { ProductColumn } from "../ProductTable/ProductTableColumns";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: ProductColumn | null;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
}: ProductDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>

          <DialogTitle>
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>

        </DialogHeader>

        <ProductForm
          product={product}
          onSuccess={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}