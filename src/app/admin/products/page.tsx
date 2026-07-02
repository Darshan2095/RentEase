"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProductStats from "@/features/products/components/ProductStats/ProductStats";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/hooks/useProducts";

import ProductTable from "@/features/products/components/ProductTable/ProductTable";
import ProductDialog from "@/features/products/components/ProductDialog";
import DeleteProductDialog from "@/features/products/components/DeleteProductDialog";
import { useBulkProducts } from "@/features/products/hooks/useBulkProducts";
import { ProductColumn } from "@/features/products/components/ProductTable/ProductTableColumns";
import BulkActions from "@/features/products/components/BulkActions/BulkActions";

export default function ProductsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductColumn | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const { data } = useProducts({
    page: 1,
    limit: 10,
  });
  const products = data?.data ?? [];
const bulkMutation = useBulkProducts();
  function toggleRow(id: string) {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

    useEffect(() => {
  if (bulkMutation.isSuccess) {
    setSelectedRows({});
  }
}, [bulkMutation.isSuccess]);
  

  function toggleAll() {
    if (!products.length) return;

    const allSelected =
      Object.keys(selectedRows).length === products.length;

    if (allSelected) {
      setSelectedRows({});
      return;
    }

    const rows: Record<string, boolean> = {};

    products.forEach((product: ProductColumn) => {
      rows[product._id] = true;
    });

    setSelectedRows(rows);
  }

  const selectedIds = Object.keys(selectedRows).filter(
    (id) => selectedRows[id]
  );
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage all rental products.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedProduct(null);
            setOpenDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>

      </div>

      <BulkActions
        count={selectedIds.length}
        onDelete={() =>
  bulkMutation.mutate({
    ids: selectedIds,
    action: "DELETE",
  })
}
        onActivate={() =>
  bulkMutation.mutate({
    ids: selectedIds,
    action: "ACTIVATE",
  })
}
        onDeactivate={() =>
  bulkMutation.mutate({
    ids: selectedIds,
    action: "DEACTIVATE",
  })
}

      />

      <ProductTable
        products={products}
        selectedRows={selectedRows}
        onToggleRow={toggleRow}
        onToggleAll={toggleAll}
        allSelected={products.length > 0 && selectedIds.length === products.length}
        onEdit={(product) => {
          setSelectedProduct(product);
          setOpenDialog(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setDeleteDialog(true);
        }}
      />

      <ProductDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        product={selectedProduct}
      />
      <ProductStats />
      {selectedProduct && (
        <DeleteProductDialog
          open={deleteDialog}
          onOpenChange={setDeleteDialog}
          slug={selectedProduct.slug}
        />
      )}

    </div>
  );
}