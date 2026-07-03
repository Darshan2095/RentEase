import {
NextRequest,
NextResponse
} from "next/server";


import {
connectDB
} from "@/lib/mongodb";


import Rental from "@/models/Rental";



interface Context{

params:Promise<{

id:string

}>

}




export async function PATCH(

req:NextRequest,

{params}:Context

){


try{


await connectDB();


const {
id
}=await params;



const {
months
}=await req.json();



const rental:any =
await Rental.findById(id);



if(!rental){


return NextResponse.json(
{
success:false,
message:"Rental not found"
},
{
status:404
}
)

}



const endDate =
new Date(
rental.endDate
);



endDate.setMonth(

endDate.getMonth()
+
months

);



rental.endDate =
endDate;


rental.extensionCount +=1;


rental.status =
"EXTENDED";



await rental.save();



return NextResponse.json({

success:true,

data:rental

});



}

catch(error:any){


return NextResponse.json(
{
success:false,
message:error.message
},
{
status:500
}
)


}


}