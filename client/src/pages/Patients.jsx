import { useEffect, useState } from "react";


const Patients = () => {


const [patients,setPatients] = useState([]);

const [search,setSearch] = useState("");

const [showForm,setShowForm] = useState(false);



const [newPatient,setNewPatient] = useState({

name:"",
email:"",
phone:"",
age:"",
gender:""

});



const token = localStorage.getItem("token");




// GET PATIENTS

const fetchPatients = async()=>{


try{


const res = await fetch(

"http://localhost:5000/api/patients",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



const data = await res.json();



setPatients(data.patients || []);



}

catch(error){

console.log(error);

}


};





useEffect(()=>{

fetchPatients();

},[]);







// ADD PATIENT


const addPatient = async()=>{


try{


const res = await fetch(

"http://localhost:5000/api/patients",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},


body:JSON.stringify({

...newPatient,

age:Number(newPatient.age)

})


}

);



const data = await res.json();



if(res.ok){


setPatients([

...patients,

data.patient

]);



setShowForm(false);



setNewPatient({

name:"",
email:"",
phone:"",
age:"",
gender:""

});


}

else{


alert(data.message);


}


}


catch(error){

console.log(error);

}



};









// DELETE PATIENT


const deletePatient = async(id)=>{


try{


await fetch(

`http://localhost:5000/api/patients/${id}`,

{

method:"DELETE",

headers:{

Authorization:`Bearer ${token}`

}

}

);



setPatients(

patients.filter(

patient=>patient._id !== id

)

);



}

catch(error){

console.log(error);

}


};







const filteredPatients = patients.filter((patient)=>


patient.name
.toLowerCase()
.includes(search.toLowerCase())

||

patient.phone.includes(search)


);








return (

<div>



<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">

Patients

</h1>


<p className="text-gray-600 mt-2">

Manage hospital patients records

</p>


</div>




<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Add Patient

</button>


</div>







{

showForm && (


<div className="bg-white shadow rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">

Add New Patient

</h2>



<div className="grid md:grid-cols-2 gap-4">


<input

placeholder="Name"

value={newPatient.name}

onChange={(e)=>

setNewPatient({

...newPatient,

name:e.target.value

})

}

className="border p-3 rounded-lg"

/>





<input

placeholder="Email"

value={newPatient.email}

onChange={(e)=>

setNewPatient({

...newPatient,

email:e.target.value

})

}

className="border p-3 rounded-lg"

/>






<input

placeholder="Phone"

value={newPatient.phone}

onChange={(e)=>

setNewPatient({

...newPatient,

phone:e.target.value

})

}

className="border p-3 rounded-lg"

/>







<input

placeholder="Age"

value={newPatient.age}

onChange={(e)=>

setNewPatient({

...newPatient,

age:e.target.value

})

}

className="border p-3 rounded-lg"

/>







<select

value={newPatient.gender}

onChange={(e)=>

setNewPatient({

...newPatient,

gender:e.target.value

})

}

className="border p-3 rounded-lg"

>


<option value="">

Select Gender

</option>


<option>

Male

</option>


<option>

Female

</option>


<option>

Other

</option>


</select>




</div>





<button

onClick={addPatient}

className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5"

>

Save Patient

</button>




</div>


)

}









<div className="bg-white rounded-xl shadow p-6 mt-8">


<input

placeholder="Search patient..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-full mb-5"

/>






<table className="w-full">


<thead>

<tr className="bg-slate-100">


<th className="p-3 text-left">
Name
</th>


<th className="p-3 text-left">
Phone
</th>


<th className="p-3 text-left">
Age
</th>


<th className="p-3 text-left">
Gender
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>





<tbody>


{

filteredPatients.map((patient)=>(


<tr key={patient._id} className="border-b">


<td className="p-3">

{patient.name}

</td>



<td className="p-3">

{patient.phone}

</td>



<td className="p-3">

{patient.age}

</td>




<td className="p-3">

{patient.gender}

</td>





<td className="p-3">


<button

onClick={()=>deletePatient(patient._id)}

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


export default Patients;