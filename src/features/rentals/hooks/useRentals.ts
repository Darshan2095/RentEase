"use client";


import {
useQuery
} from "@tanstack/react-query";


import {
rentalService
} from "../services/rental.service";



interface UseRentalsProps{

page?:number;

limit?:number;

status?:string;

search?:string;

}



export function useRentals({

page=1,

limit=10,

status="",

search=""

}:UseRentalsProps = {}){



return useQuery({

queryKey:[
"rentals",
page,
limit,
status,
search
],



queryFn:()=>


rentalService.getRentals({

page,

limit,

status,

search

})


});


}