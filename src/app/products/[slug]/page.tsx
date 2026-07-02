import { productService } from "@/features/products/services/product.service";
import ProductGallery from "@/features/products/components/ProductGallery/ProductGallery";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  const product = await productService.getProduct(params.slug);

  return (
    <div className="container py-10">

      <div className="grid lg:grid-cols-2 gap-10">

        <ProductGallery images={product.images} />

        <ProductInfo product={product} />

      </div>

    </div>
  );
}