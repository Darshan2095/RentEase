"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../services/cart.service";


export function useRemoveCart() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
    (productId:string)=>
      cartService.removeItem(
        productId
      ),


    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:["cart"],
      });

    },


  });

}