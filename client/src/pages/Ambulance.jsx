import { useState } from "react";


const Ambulance = () => {


const [search,setSearch]=useState("");

const [showForm,setShowForm]=useState(false);



const [ambulances,setAmbulances]=useState([

{
id:1,
vehicle:"UP32 AB1234",
driver:"Ramesh Kumar",
phone:"9876543210",
type:"ICU",
location:"Hospital Gate",
status:"Available"
},

{
id:2,
vehicle:"UP32 CD5678",
driver:"Arjun Singh",
phone:"9123456780",
type:"Basic",
location:"Gomti Nagar",
status:"Busy"
},

{
id:3,
vehicle:"UP32 EF9012",
driver:"Salman Khan",
phone:"9988776655",
type:"Emergency",
location:"Aliganj",
status:"Available"
}

]);





const [ambulance,setAmbulance]=useState({

vehicle:"",
driver:"",
phone:"",
type:"",
location:"",
status:"Available"

});





const filteredAmbulances=ambulances.filter((item)=>

item.vehicle.toLowerCase().includes(search.toLowerCase()) ||

item.driver.toLowerCase().includes(search.toLowerCase()) ||

item.location.toLowerCase().includes(search.toLowerCase())

);






const addAmbulance=()=>{


const data={

id:ambulances.length+1,

...ambulance

};


setAmbulances([...ambulances,data]);


setAmbulance({

vehicle:"",
driver:"",
phone:"",
type:"",
location:"",
status:"Available"

});


setShowForm(false);


};







const deleteAmbulance=(id)=>{


setAmbulances(

ambulances.filter((item)=>item.id!==id)

);


};






const editStatus=(id)=>{


setAmbulances(

ambulances.map((item)=>

item.id===id

?

{

...item,

status:item.status==="Available"

?

"Busy"

:

"Available"

}

:

item

)

);


};






return (

<div>


<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">
Ambulance
</h1>


<p className="text-gray-600 mt-2">
Manage emergency ambulance services
</p>


</div>




<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Add Ambulance

</button>


</div>







{
showForm && (

<div className="bg-white shadow-md rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">
Add Ambulance
</h2>



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">



{

Object.keys(ambulance).map((field)=>(


<input

key={field}

placeholder={field}

value={ambulance[field]}

onChange={(e)=>

setAmbulance({

...ambulance,

[field]:e.target.value

})

}

className="border p-3 rounded-lg"

/>


))


}


</div>




<button

onClick={addAmbulance}

className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5 mr-3"

>

Save

</button>



<button

onClick={()=>setShowForm(false)}

className="bg-gray-500 text-white px-5 py-2 rounded-lg mt-5"

>

Cancel

</button>



</div>


)

}







<div className="bg-white rounded-xl shadow-md p-6 mt-8">


<input

type="text"

placeholder="Search ambulance..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-full mb-5"

/>






<table className="w-full">


<thead>


<tr className="bg-slate-100">


<th className="p-4 text-left">ID</th>

<th className="p-4 text-left">Vehicle</th>

<th className="p-4 text-left">Driver</th>

<th className="p-4 text-left">Phone</th>

<th className="p-4 text-left">Type</th>

<th className="p-4 text-left">Location</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Action</th>


</tr>


</thead>





<tbody>


{

filteredAmbulances.map((item)=>(


<tr key={item.id} className="border-b">


<td className="p-4">
{item.id}
</td>


<td className="p-4 font-medium">
{item.vehicle}
</td>


<td className="p-4">
{item.driver}
</td>


<td className="p-4">
{item.phone}
</td>


<td className="p-4">
{item.type}
</td>


<td className="p-4">
{item.location}
</td>



<td className="p-4">


<span className={`px-3 py-1 rounded-full ${
item.status==="Busy"

?

"bg-red-100 text-red-700"

:

"bg-green-100 text-green-700"

}`}>

{item.status}

</span>


</td>



<td className="p-4">


<button

onClick={()=>editStatus(item.id)}

className="text-blue-600 mr-3"

>

Edit

</button>



<button

onClick={()=>deleteAmbulance(item.id)}

className="text-red-600"

>

Delete

</button>


</td>


</tr>


))


}


</tbody>


</table>



</div>



</div>

);


};


export default Ambulance;
