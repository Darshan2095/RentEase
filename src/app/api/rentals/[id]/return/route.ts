import {
NextRequest,
NextResponse
} from "next/server";


import {
connectDB
} from "@/lib/mongodb";


import Rental from "@/models/Rental";

import Product from "@/models/Product";



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


const body =
await req.json();



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




if(
rental.status==="RETURNED"
){


return NextResponse.json(

{
success:false,
message:"Already returned"
},

{
status:400
}

)

}




rental.status =
"RETURNED";


rental.actualReturnDate =
new Date();



rental.damageStatus =
body.damageStatus ??
"NONE";



rental.damageCharges =
body.damageCharges ??
0;



rental.notes =
body.notes ??
"";



await rental.save();





// Restore product stock


await Product.findByIdAndUpdate(

rental.product,

{

$inc:{

availableStock:
rental.quantity

}

}

);





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