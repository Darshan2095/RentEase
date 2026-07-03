import api from "@/lib/api";


export const orderService = {


getOrders: async ({
page=1,
status="",
search=""
}:{
page?:number;
status?:string;
search?:string;
})=>{


const {data}=await api.get(
"/orders",
{
params:{
page,
status,
search
}
}
);


return data;


},



getOrderById:async(
id:string
)=>{


const {data}=await api.get(
`/orders/${id}`
);


return data.data;

},



updateStatus:async(
id:string,
status:string
)=>{


const {data}=await api.patch(
`/orders/${id}/status`,
{
orderStatus:status
}
);


return data;


}


};