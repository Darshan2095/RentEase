import { notFound } from "next/navigation";

import ProductGallery from "@/features/products/components/ProductGallery/ProductGallery";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  await connectDB();

  const { slug } = await params;

  const product = await Product.findOne({
    slug,
  })
    .populate("category")
    .lean();

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-10">

      <div className="grid lg:grid-cols-2 gap-10">

        <ProductGallery images={product.images} />

        <ProductInfo product={product} />

      </div>

    </div>
  );
}