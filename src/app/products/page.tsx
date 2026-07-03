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
  const [category, setCategory] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [sort, setSort] = useState("-createdAt");

  const { data: categories = [] } = useCategories();

  const productQueryFilters = {
    page,
    limit: 12,
    search: debouncedSearch || undefined,
    category: category === "all" ? undefined : category,
    featured:
      featured === "all" ? undefined : featured === "true",
    sort,
  };

  const { data, isLoading } = useProducts(productQueryFilters);

  const products = data?.data ?? [];

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
          setSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          category={category}
          setCategory={(value) => {
            setPage(1);
            setCategory(value);
          }}
          featured={featured}
          setFeatured={(value) => {
            setPage(1);
            setFeatured(value);
          }}
          sort={sort}
          setSort={(value) => {
            setPage(1);
            setSort(value);
          }}
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