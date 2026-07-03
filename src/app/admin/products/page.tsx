"use client";

import { useState, useEffect } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductColumn } from "@/features/products/components/ProductTable/ProductTableColumns";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useBulkProducts } from "@/features/products/hooks/useBulkProducts";

import ProductStats from "@/features/products/components/ProductStats/ProductStats";
import ProductTable from "@/features/products/components/ProductTable/ProductTable";
import ProductDialog from "@/features/products/components/ProductDialog";
import DeleteProductDialog from "@/features/products/components/DeleteProductDialog";
import BulkActions from "@/features/products/components/BulkActions/BulkActions";



export default function ProductsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductColumn | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const { data } = useProducts({ page: 1, limit: 10 });
  const products = data?.data ?? [];
  const bulkMutation = useBulkProducts();

  // Reset selection on success
  useEffect(() => { if (bulkMutation.isSuccess) setSelectedRows({}); }, [bulkMutation.isSuccess]);

  function toggleRow(id: string) {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll() {
    if (!products.length) return;
    const allSelected = Object.keys(selectedRows).length === products.length;
    setSelectedRows(allSelected ? {} : Object.fromEntries(products.map((p: any) => [p._id, true])));
  }

  const selectedIds = Object.keys(selectedRows).filter((id) => selectedRows[id]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
            <p className="text-sm text-slate-500">Manage, edit, and organize rental products.</p>
          </div>
        </div>
        <Button onClick={() => { setSelectedProduct(null); setOpenDialog(true); }} className="rounded-xl shadow-lg shadow-indigo-600/20">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Stats Summary - Kept at the top for visibility */}
      <ProductStats />

      {/* Bulk Actions Bar */}
      <BulkActions
        count={selectedIds.length}
        onDelete={() => bulkMutation.mutate({ ids: selectedIds, action: "DELETE" })}
        onActivate={() => bulkMutation.mutate({ ids: selectedIds, action: "ACTIVATE" })}
        onDeactivate={() => bulkMutation.mutate({ ids: selectedIds, action: "DEACTIVATE" })}
      />

      {/* Product Table Container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <ProductTable
          products={products}
          selectedRows={selectedRows}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          allSelected={products.length > 0 && selectedIds.length === products.length}
          onEdit={(product) => { setSelectedProduct(product); setOpenDialog(true); }}
          onDelete={(product) => { setSelectedProduct(product); setDeleteDialog(true); }}
        />
      </div>

      <ProductDialog open={openDialog} onOpenChange={setOpenDialog} product={selectedProduct} />
      {selectedProduct && (
        <DeleteProductDialog open={deleteDialog} onOpenChange={setDeleteDialog} slug={selectedProduct.slug} />
      )}
    </div>
  );
}