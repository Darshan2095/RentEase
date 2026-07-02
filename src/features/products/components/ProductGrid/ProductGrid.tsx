"use client";

import ProductCard from "../ProductCard/ProductCard";

interface Props {
  products: any[];
}

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  );
}