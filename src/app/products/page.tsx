"use client";

import { useState } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { PublicLayout } from "@/components/layout/PublicLayout/PublicLayout";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "@/features/products/components/ProductGrid/ProductGrid";
import ProductFilters from "@/features/products/components/ProductFilters/ProductFilters";
import ProductPagination from "@/features/products/components/ProductPagination/ProductPagination";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [category, setCategory] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [sort, setSort] = useState("-createdAt");

  const { data: categories = [] } = useCategories();
  
  const { data, isLoading } = useProducts({
    page,
    limit: 12,
    search: debouncedSearch || undefined,
    category: category === "all" ? undefined : category,
    featured: featured === "all" ? undefined : featured === "true",
    sort,
  });

  const products = data?.data ?? [];

  return (
    <PublicLayout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Rental Marketplace
          </h1>
          <p className="text-lg text-slate-500">
            Premium furniture and appliances, delivered to your door.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <ProductFilters
            search={search}
            setSearch={(val) => { setPage(1); setSearch(val); }}
            category={category}
            setCategory={(val) => { setPage(1); setCategory(val); }}
            featured={featured}
            setFeatured={(val) => { setPage(1); setFeatured(val); }}
            sort={sort}
            setSort={(val) => { setPage(1); setSort(val); }}
            categories={categories}
          />
        </div>

        {/* Grid/Loading Section */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-xl font-semibold text-slate-900">No items found</h3>
              <p className="text-slate-500">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {!isLoading && products.length > 0 && (
          <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
            <ProductPagination
              page={page}
              totalPages={data?.pagination?.totalPages ?? 1}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </PublicLayout>
  );
}