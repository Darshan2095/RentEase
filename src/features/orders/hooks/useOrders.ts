"use client";


import {useQuery} from "@tanstack/react-query";

import {
orderService
} from "../services/order.service";


export function useOrders({

page=1,
status="",
search=""

}:{


page?:number;

status?:string;

search?:string;


}){


return useQuery({

queryKey:[
"orders",
page,
status,
search
],


queryFn:()=>


orderService.getOrders({

page,

status,

search

})


});


}