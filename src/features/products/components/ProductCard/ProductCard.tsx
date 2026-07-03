"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Button
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Eye,
  ShoppingCart,
  Loader2,
} from "lucide-react";

import { useAddToCart } from "@/features/cart/hooks/useAddToCart";


interface ProductCardProps {
  product: any;
}


export default function ProductCard({
  product,
}: ProductCardProps) {


  const {
    mutate,
    isPending,
  } = useAddToCart();


  const categoryLabel =
    product.category?.name ||
    product.category ||
    "Category";


  const imageSrc =
    product.images?.[0] ||
    "/placeholder.jpg";



  function handleRent(){


    mutate({

      productId:
        product._id,

      quantity:1,


      rentalTenure:
        product.rentalTenure?.[0] ??
        3,


    });


  }



  return (

    <Card className="overflow-hidden">


      <div className="relative h-60">


        <Image

          src={imageSrc}

          alt={
            product.name
          }

          fill

          className="object-cover"

        />



        {

          product.isFeatured && (

            <Badge className="absolute top-3 left-3">

              Featured

            </Badge>

          )

        }


      </div>




      <CardContent className="space-y-3 p-4">


        <Badge variant="secondary">

          {
            categoryLabel
          }

        </Badge>



        <h3 className="text-lg font-semibold line-clamp-1">

          {
            product.name
          }

        </h3>



        <p className="text-sm text-muted-foreground line-clamp-2">

          {
            product.description
          }

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



        <Button
          asChild
          variant="outline"
        >


          <Link
            href={`/products/${product.slug}`}
          >


            <Eye className="mr-2 h-4 w-4"/>


            Details


          </Link>


        </Button>




        <Button

          disabled={
            isPending
          }

          onClick={
            handleRent
          }

        >


          {

          isPending ?

          (

          <>

            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

            Adding

          </>

          )

          :

          (

          <>

            <ShoppingCart className="mr-2 h-4 w-4"/>

            Rent

          </>

          )


          }


        </Button>



      </CardFooter>


    </Card>

  );
}