"use client";


import {
CalendarDays,
Clock,
IndianRupee
} from "lucide-react";


import {
Button
} from "@/components/ui/button";


import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";



interface Props{

rental:any;

onView:()=>void;

onExtend:()=>void;

onReturn:()=>void;

}



export default function UserRentalCard({

rental,

onView,

onExtend,

onReturn

}:Props){



const remainingDays =

Math.max(

0,

Math.ceil(

(
new Date(
rental.endDate
).getTime()
-
Date.now()
)

/(1000*60*60*24)

)

);



return (

<div className="rounded-xl border p-5 space-y-5">


<div className="flex justify-between">


<div>


<h3 className="font-semibold text-lg">

{
rental.product?.name
}

</h3>


<p className="text-sm text-muted-foreground">

Rental #
{
rental._id.slice(-6)
}

</p>


</div>


<RentalStatusBadge
status={
rental.status
}
/>


</div>



<div className="grid md:grid-cols-3 gap-4">


<div>

<CalendarDays/>

<p className="text-sm">

Start

</p>


<p>

{
new Date(
rental.startDate
)
.toLocaleDateString()
}

</p>


</div>




<div>

<Clock/>

<p className="text-sm">

Remaining

</p>


<p>

{
remainingDays
}

 days

</p>


</div>




<div>

<IndianRupee/>

<p className="text-sm">

Monthly Rent

</p>


<p>

₹{
rental.monthlyRent
}

</p>


</div>


</div>




<div className="flex gap-3">


<Button
variant="outline"
onClick={onView}
>

Details

</Button>


<Button
variant="outline"
onClick={onExtend}
>

Extend

</Button>


<Button
variant="destructive"
onClick={onReturn}
>

Return

</Button>


</div>



</div>

)

}