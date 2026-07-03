"use client";

import ProductCard from "../ProductCard/ProductCard";

interface Props {
  products: any[];
}

export default function ProductGrid({ products }: Props) {
  // Graceful Empty State
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
           {/* Add a Lucide "PackageSearch" icon here if available */}
           <span className="text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">No products found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="transition-all duration-300 hover:-translate-y-1">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}