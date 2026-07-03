"use client";

import { useState } from "react";

import { useRentals } from "@/features/rentals/hooks/useRentals";

import UserRentalCard from "@/features/rentals/components/UserRentalCard/UserRentalCard";

import RentalDetailsDialog from "@/features/rentals/components/RentalDetailsDialog/RentalDetailsDialog";

import ExtendRentalDialog from "@/features/rentals/components/ExtendRentalDialog/ExtendRentalDialog";

import ReturnRentalDialog from "@/features/rentals/components/ReturnRentalDialog/ReturnRentalDialog";


export default function RentalsPage(){


const {

data,

isLoading

}=useRentals({

page:1,

status:""

});


const rentals =
data?.data ?? [];



const [
selectedRental,
setSelectedRental
]=useState<any>(null);



const [
detailsOpen,
setDetailsOpen
]=useState(false);



const [
extendOpen,
setExtendOpen
]=useState(false);



const [
returnOpen,
setReturnOpen
]=useState(false);



if(isLoading){

return (

<div>

Loading rentals...

</div>

)

}



return (

<div className="space-y-6">


<div>


<h1 className="text-2xl font-bold">

My Rentals

</h1>


<p className="text-muted-foreground">

Manage your active rentals

</p>


</div>



{

rentals.length===0 && (

<div className="rounded-lg border p-10 text-center">

No active rentals found

</div>

)

}



<div className="grid gap-5">


{

rentals.map(

(rental:any)=>(


<UserRentalCard

key={
rental._id
}

rental={
rental
}

onView={()=>{

setSelectedRental(rental);

setDetailsOpen(true);

}}

onExtend={()=>{

setSelectedRental(rental);

setExtendOpen(true);

}}

onReturn={()=>{

setSelectedRental(rental);

setReturnOpen(true);

}}


/>

)

)

}


</div>




<RentalDetailsDialog

open={
detailsOpen
}

onOpenChange={
setDetailsOpen
}

rental={
selectedRental
}

/>




<ExtendRentalDialog

open={
extendOpen
}

onOpenChange={
setExtendOpen
}

rental={
selectedRental
}

/>



<ReturnRentalDialog

open={
returnOpen
}

onOpenChange={
setReturnOpen
}

rental={
selectedRental
}

/>


</div>

)

}