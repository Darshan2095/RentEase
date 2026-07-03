"use client";


import {
useMutation,
useQueryClient
} from "@tanstack/react-query";


import {
toast
} from "sonner";


import {
rentalService
} from "../services/rental.service";



export function useReturnRental(){


const queryClient =
useQueryClient();



return useMutation({


mutationFn:
({
id,
damageStatus,
damageCharges,
notes

}:{

id:string;

damageStatus:string;

damageCharges:number;

notes:string;

})=>


rentalService.returnRental(

id,

{

damageStatus,

damageCharges,

notes

}

),




onSuccess:()=>{


toast.success(
"Rental returned successfully"
);


queryClient.invalidateQueries({

queryKey:["rentals"]

});


},




onError:()=>{


toast.error(
"Return failed"
);


}


});


}