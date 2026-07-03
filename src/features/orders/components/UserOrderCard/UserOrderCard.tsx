"use client";

import {
  Package,
  Calendar,
  IndianRupee,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  order: any;
  onView: (order:any)=>void;
}

export default function UserOrderCard({
  order,
  onView,
}:Props){


const firstItem =
order.items?.[0];


return (

<div className="rounded-xl border bg-card p-5 space-y-5">


{/* Header */}

<div className="flex items-center justify-between">


<div>


<h3 className="font-semibold">

Order #
{order._id.slice(-6).toUpperCase()}

</h3>


<p className="text-sm text-muted-foreground">

<Calendar className="inline h-4 w-4 mr-1"/>

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</p>


</div>


<Badge>

{order.orderStatus}

</Badge>


</div>



{/* Product */}


<div className="flex items-center gap-4">


<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">

<Package/>

</div>


<div>


<p className="font-medium">

{
firstItem?.product?.name
}

</p>


<p className="text-sm text-muted-foreground">


{
order.items.length
}

 item(s)

</p>


</div>


</div>



{/* Amount */}


<div className="flex items-center justify-between">


<div>


<p className="text-sm text-muted-foreground">

Total Amount

</p>


<p className="flex items-center font-semibold">

<IndianRupee className="h-4 w-4"/>

{
order.total
}

</p>


</div>



<Button
variant="outline"
onClick={()=>
onView(order)
}
>


<Eye className="mr-2 h-4 w-4"/>

Details

</Button>


</div>



</div>

)

}