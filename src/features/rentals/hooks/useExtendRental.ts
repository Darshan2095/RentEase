"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { rentalService } from "../services/rental.service";


export function useExtendRental(){

const queryClient =
useQueryClient();


return useMutation({

mutationFn:
({
id,
months
}:{
id:string;
months:number;
})=>


rentalService.extendRental(
id,
months
),



onSuccess:()=>{


toast.success(
"Rental extended successfully"
);


queryClient.invalidateQueries({
queryKey:["rentals"]
});


},



onError:()=>{


toast.error(
"Failed to extend rental"
);


}


});


}