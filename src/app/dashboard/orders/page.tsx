"use client";


import {useState} from "react";

import {useOrders} from "@/features/orders/hooks/useOrders";

import UserOrderCard from "@/features/orders/components/UserOrderCard/UserOrderCard";

import OrderDetailsDialog from "@/features/orders/components/OrderDetailsDialog/OrderDetailsDialog";


export default function OrdersPage(){


const {

data,

isLoading

}=useOrders({

page:1

});



const orders =
data?.data ?? [];



const [
selectedOrder,
setSelectedOrder

]=useState<any>(null);



const [
open,
setOpen
]=useState(false);



if(isLoading){

return (

<div>

Loading orders...

</div>

)

}



return (

<div className="space-y-6">


<div>


<h1 className="text-2xl font-bold">

My Orders

</h1>


<p className="text-muted-foreground">

Track your rental orders

</p>


</div>



{

orders.length===0 && (

<div className="rounded-lg border p-10 text-center">

No orders found

</div>

)

}



<div className="grid gap-5">


{

orders.map(
(order:any)=>(


<UserOrderCard

key={
order._id
}

order={
order
}

onView={(item)=>{

setSelectedOrder(item);

setOpen(true);

}}


/>

)

)

}


</div>



<OrderDetailsDialog

open={open}

onOpenChange={setOpen}

order={selectedOrder}

/>


</div>

)

}