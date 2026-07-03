"use client";

import { Button } from "@/components/ui/button";

import {
  ShoppingCart,
  Loader2,
} from "lucide-react";

import { useAddToCart } from "@/features/cart/hooks/useAddToCart";


interface Props {
  product:any;
}


export default function AddToCartButton({
product
}:Props){


const mutation =
useAddToCart();


function handleAddToCart(){

mutation.mutate({

productId:
product._id,

quantity:1,


// default selected duration
rentalTenure:
product.rentalTenure?.[0] ?? 3

});

}



return (

<Button

className="w-full"

size="lg"

disabled={
mutation.isPending
}

onClick={
handleAddToCart
}

>


{
mutation.isPending ? (

<>

<Loader2 className="mr-2 h-5 w-5 animate-spin"/>

Adding...

</>

)

:

(

<>

<ShoppingCart className="mr-2 h-5 w-5"/>

Add To Cart

</>

)

}


</Button>


)

}