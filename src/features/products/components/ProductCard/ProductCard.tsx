"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Eye, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">

      <div className="relative h-60">

        <Image
          src={"/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {product.isFeatured && (
          <Badge className="absolute top-3 left-3">
            Featured
          </Badge>
        )}

      </div>

      <CardContent className="space-y-3 p-4">

        <Badge variant="secondary">
          {product.category}
        </Badge>

        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="space-y-1">

          <p className="text-xl font-bold">
            ₹{product.monthlyRent}/month
          </p>

          <p className="text-sm text-muted-foreground">
            Deposit ₹{product.securityDeposit}
          </p>

        </div>

      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3">

        <Button asChild variant="outline">

          <Link href={`/products/${product.slug}`}>

            <Eye className="mr-2 h-4 w-4" />

            Details

          </Link>

        </Button>

        <Button>

          <ShoppingCart className="mr-2 h-4 w-4" />

          Rent

        </Button>

      </CardFooter>

    </Card>
  );
}