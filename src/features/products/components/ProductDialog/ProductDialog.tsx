"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden shadow-2xl border-slate-200">
        
        {/* Header with Background Accent */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-slate-950">
              {product ? "Edit Asset Details" : "Register New Asset"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 font-medium">
              {product 
                ? "Update technical specifications and availability status for this unit." 
                : "Add a new furniture or appliance unit to your rental inventory."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Container with Scroll Padding */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200">
          <ProductForm
            product={product}
            onSuccess={() => onOpenChange(false)}
          />
        </div>

        {/* Footer Accent / Optional Action Summary */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-end">
           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
             {product ? "System ID: " + product._id : "Inventory Module"}
           </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}