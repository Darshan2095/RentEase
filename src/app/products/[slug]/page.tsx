import { notFound } from "next/navigation";
import ProductGallery from "@/features/products/components/ProductGallery/ProductGallery";
import ProductInfo from "@/features/products/components/ProductInfo/ProductInfo";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  await connectDB();
  const { slug } = await params;

  const product = await Product.findOne({ slug })
    .populate("category")
    .lean();

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb or Back navigation could go here */}
        
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery Section - Sticky on Desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-2 shadow-sm border border-slate-200">
              <ProductGallery images={product.images} />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <ProductInfo product={product} />
            </div>
            
            {/* Trust Signals or Additional Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                ✅ Free delivery & installation
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                🔄 Easy returns & swaps
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}