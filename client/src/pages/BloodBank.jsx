import { useState } from "react";


const BloodBank = () => {


const [search,setSearch]=useState("");

const [showForm,setShowForm]=useState(false);



const [bloodStock,setBloodStock]=useState([

{
id:1,
group:"A+",
donor:"Rahul Kumar",
units:5,
contact:"9876543210",
date:"01 Aug 2026",
status:"Available"
},

{
id:2,
group:"O-",
donor:"Sara Ali",
units:3,
contact:"9123456780",
date:"28 July 2026",
status:"Available"
},

{
id:3,
group:"B+",
donor:"Amit Verma",
units:2,
contact:"9988776655",
date:"25 July 2026",
status:"Low Stock"
}

]);





const [blood,setBlood]=useState({

group:"",
donor:"",
units:"",
contact:"",
date:""

});







const filteredBlood=bloodStock.filter((item)=>

item.group.toLowerCase().includes(search.toLowerCase()) ||

item.donor.toLowerCase().includes(search.toLowerCase()) ||

item.contact.includes(search)

);







const addBlood=()=>{


const newBlood={

id:bloodStock.length+1,

group:blood.group,

donor:blood.donor,

units:Number(blood.units),

contact:blood.contact,

date:blood.date,

status:Number(blood.units)<=2

?

"Low Stock"

:

"Available"

};



setBloodStock([...bloodStock,newBlood]);



setBlood({

group:"",
donor:"",
units:"",
contact:"",
date:""

});


setShowForm(false);


};







const deleteBlood=(id)=>{


setBloodStock(

bloodStock.filter((item)=>item.id!==id)

);


};








const updateUnits=(id)=>{


setBloodStock(

bloodStock.map((item)=>


item.id===id

?

{

...item,

units:item.units+1,

status:item.units+1<=2

?

"Low Stock"

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
Blood Bank
</h1>


<p className="text-gray-600 mt-2">
Manage blood inventory and donors
</p>


</div>



<button

onClick={()=>setShowForm(true)}

className="bg-red-600 text-white px-5 py-3 rounded-lg"

>

+ Add Donor

</button>


</div>







{

showForm &&

(

<div className="bg-white shadow-md rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">
Add Blood Donor
</h2>



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">


<input

placeholder="Blood Group"

value={blood.group}

onChange={(e)=>setBlood({

...blood,

group:e.target.value

})}

className="border p-3 rounded-lg"

/>



<input

placeholder="Donor Name"

value={blood.donor}

onChange={(e)=>setBlood({

...blood,

donor:e.target.value

})}

className="border p-3 rounded-lg"

/>



<input

placeholder="Units"

type="number"

value={blood.units}

onChange={(e)=>setBlood({

...blood,

units:e.target.value

})}

className="border p-3 rounded-lg"

/>



<input

placeholder="Contact"

value={blood.contact}

onChange={(e)=>setBlood({

...blood,

contact:e.target.value

})}

className="border p-3 rounded-lg"

/>



<input

placeholder="Donation Date"

value={blood.date}

onChange={(e)=>setBlood({

...blood,

date:e.target.value

})}

className="border p-3 rounded-lg"

/>



</div>




<button

onClick={addBlood}

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

placeholder="Search blood group or donor..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-full mb-5"

/>





<table className="w-full">


<thead>


<tr className="bg-slate-100">


<th className="p-4 text-left">ID</th>

<th className="p-4 text-left">Group</th>

<th className="p-4 text-left">Donor</th>

<th className="p-4 text-left">Units</th>

<th className="p-4 text-left">Contact</th>

<th className="p-4 text-left">Date</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Action</th>


</tr>


</thead>




<tbody>


{

filteredBlood.map((item)=>(


<tr key={item.id} className="border-b">


<td className="p-4">
{item.id}
</td>


<td className="p-4 font-bold text-red-600">
{item.group}
</td>


<td className="p-4">
{item.donor}
</td>


<td className="p-4">
{item.units}
</td>


<td className="p-4">
{item.contact}
</td>


<td className="p-4">
{item.date}
</td>




<td className="p-4">

<span className={`px-3 py-1 rounded-full ${
item.status==="Low Stock"

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

onClick={()=>updateUnits(item.id)}

className="text-blue-600 mr-3"

>

+ Unit

</button>




<button

onClick={()=>deleteBlood(item.id)}

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


export default BloodBank;