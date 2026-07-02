"use client";

import { useProducts } from "@/features/products/hooks/useProducts";
import ProductGrid from "@/features/products/components/ProductGrid/ProductGrid";
import { PublicLayout } from "@/components/layout/PublicLayout/PublicLayout";
import { useState } from "react";
import ProductFilters from "@/features/products/components/ProductFilters/ProductFilters";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import ProductPagination from "@/features/products/components/ProductPagination/ProductPagination";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useProducts({
    page: 1,
    limit: 12,
  });

  const products = data?.data ?? [];
  const [category, setCategory] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [sort, setSort] = useState("-createdAt");

  const { data: categories = [] } = useCategories();

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex justify-center py-20">
          Loading...
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container py-10">

        <div className="mb-8">
         

          <h1 className="text-4xl font-bold">
            Rental Products
          </h1>

          <p className="text-muted-foreground">
            Choose furniture & appliances on rent.
          </p>

        </div>

         <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            featured={featured}
            setFeatured={setFeatured}
            sort={sort}
            setSort={setSort}
            categories={categories}
          />

<ProductPagination
    page={page}
        totalPages={data?.pagination?.totalPages ?? 1}
    onPageChange={setPage}
/>
        <ProductGrid products={products} />

      </div>
    </PublicLayout>
  );
}