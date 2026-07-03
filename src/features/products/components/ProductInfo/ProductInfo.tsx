"use client";

import { Badge } from "@/components/ui/badge";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import RentalPlanSelector from "../RentalPlanSelector/RentalPlanSelector";

interface Props {
  product: any;
}

export default function ProductInfo({
  product,
}: Props) {
  const categoryName =
    product.category?.name || product.category || "Category";

  return (
    <div className="space-y-6">

      <Badge>
        {categoryName}
      </Badge>

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <p className="text-muted-foreground">
        {product.description}
      </p>

      <div>

        <h2 className="text-3xl font-bold">
          ₹{product.monthlyRent}
          <span className="text-lg font-normal">
            /month
          </span>
        </h2>

        <p>
          Security Deposit:
          ₹{product.securityDeposit}
        </p>

      </div>

      <RentalPlanSelector
        tenures={product.rentalTenure}
      />

      <AddToCartButton product={product} />

    </div>
  );
}