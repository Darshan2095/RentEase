"use client";

import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/order.service";


interface UseOrdersProps {

  page?: number;

  limit?: number;

  status?: string;

  search?: string;

}


export function useOrders({

page = 1,

limit = 10,

status = "",

search = "",

}: UseOrdersProps = {}) {


return useQuery({

queryKey: [
"orders",
page,
limit,
status,
search
],


queryFn: () =>

orderService.getOrders({

page,

limit,

status,

search,

}),


});


}