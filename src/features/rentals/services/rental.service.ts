import api from "@/lib/api";


export const rentalService = {


getRentals: async ({

page = 1,

limit = 10,

status = "",

search = ""

}:{

page?:number;

limit?:number;

status?:string;

search?:string;

})=>{


const {data}=await api.get(
"/rentals",
{
params:{

page,

limit,

status,

search

}
}
);


return data;


},



extendRental:async(
id:string,
months:number
)=>{


const {data}=await api.patch(
`/rentals/${id}/extend`,
{
months
}
);


return data;


},



returnRental:async(
id:string,
payload:{
damageStatus?:string;
damageCharges?:number;
notes?:string;
}
)=>{


const {data}=await api.patch(
`/rentals/${id}/return`,
payload
);


return data;


}


};