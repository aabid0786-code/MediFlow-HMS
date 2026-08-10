import { useEffect, useState } from "react";


const Prescriptions = () => {


const token = localStorage.getItem("token");


const [patients,setPatients] = useState([]);
const [doctors,setDoctors] = useState([]);
const [appointments,setAppointments] = useState([]);

const [prescriptions,setPrescriptions] = useState([]);


const [editMode,setEditMode] = useState(false);
const [editId,setEditId] = useState(null);



const initialForm = {

patient:"",
doctor:"",
appointment:"",
diagnosis:"",
doctorNotes:"",
followUpDate:"",

medicines:[

{
name:"",
dosage:"",
duration:"",
instructions:""
}

]

};



const [form,setForm] = useState(initialForm);





// ============================
// FETCH ALL DATA
// ============================


const fetchData = async()=>{


const headers={

Authorization:`Bearer ${token}`

};



// Patients

const pRes = await fetch(

"https://mediflow-hms-ufsa.onrender.com/api/patients",

{
headers
}

);

const pData = await pRes.json();

setPatients(pData.patients || []);





// Doctors

const dRes = await fetch(

"https://mediflow-hms-ufsa.onrender.com/api/doctors",

{
headers
}

);


const dData = await dRes.json();


setDoctors(dData.doctors || []);






// Appointments

const aRes = await fetch(

"https://mediflow-hms-ufsa.onrender.com/api/appointments",

{
headers
}

);


const aData = await aRes.json();


setAppointments(aData.appointments || []);







// Prescriptions

const prRes = await fetch(

"https://mediflow-hms-ufsa.onrender.com/api/prescriptions",

{
headers
}

);


const prData = await prRes.json();


setPrescriptions(

prData.prescriptions || []

);



};





useEffect(()=>{


fetchData();


},[]);







// ============================
// HANDLE MEDICINE CHANGE
// ============================


const updateMedicine = (index,field,value)=>{


const medicines=[...form.medicines];


medicines[index][field]=value;



setForm({

...form,

medicines

});


};







// ============================
// ADD MEDICINE ROW
// ============================


const addMedicine = ()=>{


setForm({

...form,

medicines:[

...form.medicines,

{

name:"",
dosage:"",
duration:"",
instructions:""

}

]

});


};







// ============================
// REMOVE MEDICINE
// ============================


const removeMedicine=(index)=>{


const medicines=form.medicines.filter(

(_,i)=>i!==index

);


setForm({

...form,

medicines

});


};







// ============================
// SAVE / UPDATE
// ============================


const savePrescription = async()=>{


try{


const url = editMode

? `http://localhost:5000/api/prescriptions/${editId}`
  : "http://localhost:5000/api/prescriptions";




const method = editMode

?
"PUT"

:

"POST";





const res = await fetch(

url,

{

method,

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify(form)

}

);





const data = await res.json();





if(res.ok){


alert(

editMode

?

"Prescription Updated"

:

"Prescription Saved"

);



setForm(initialForm);


setEditMode(false);

setEditId(null);


fetchData();


}

else{


alert(data.message);


}



}

catch(error){


console.log(error);

alert("Server Error");


}



};







// ============================
// EDIT
// ============================


const editPrescription=(item)=>{


setForm({

patient:item.patient?._id || item.patient,

doctor:item.doctor?._id || item.doctor,

appointment:item.appointment?._id || item.appointment,

diagnosis:item.diagnosis,

doctorNotes:item.doctorNotes || "",

followUpDate:item.followUpDate || "",

medicines:item.medicines || []

});


setEditId(item._id);

setEditMode(true);


window.scrollTo({

top:0,

behavior:"smooth"

});


};







// ============================
// DELETE
// ============================


const deletePrescription=async(id)=>{


if(!window.confirm("Delete Prescription?")) return;




const res = await fetch(

`https://mediflow-hms-ufsa.onrender.com/api/prescriptions/${id}`,

{

method:"DELETE",

headers:{

Authorization:`Bearer ${token}`

}

}

);



const data = await res.json();



if(res.ok){


alert("Prescription Deleted");

fetchData();


}

else{


alert(data.message);


}



};
return (

<div>



<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">
Prescriptions
</h1>


<p className="text-gray-600 mt-2">
Create and manage patient prescriptions
</p>


</div>



{
editMode &&

<button

onClick={()=>{

setForm(initialForm);

setEditMode(false);

setEditId(null);

}}

className="bg-gray-500 text-white px-5 py-2 rounded"

>

Cancel Edit

</button>

}


</div>







<div className="bg-white shadow rounded-xl p-6 mt-6">



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">



<select

className="border p-3 rounded"

value={form.patient}

onChange={(e)=>

setForm({

...form,

patient:e.target.value

})

}

>

<option value="">
Select Patient
</option>


{

patients.map(p=>(

<option

key={p._id}

value={p._id}

>

{p.name}

</option>

))

}


</select>







<select

className="border p-3 rounded"

value={form.doctor}

onChange={(e)=>

setForm({

...form,

doctor:e.target.value

})

}

>

<option value="">
Select Doctor
</option>


{

doctors.map(d=>(

<option

key={d._id}

value={d._id}

>

{d.name}

</option>

))

}


</select>









<select

className="border p-3 rounded"

value={form.appointment}

onChange={(e)=>

setForm({

...form,

appointment:e.target.value

})

}

>

<option value="">
Select Appointment
</option>



{

appointments.map(a=>(


<option

key={a._id}

value={a._id}

>

{a.patient?.name} - {a.doctor?.name}

</option>


))

}


</select>








<input

className="border p-3 rounded"

placeholder="Diagnosis"

value={form.diagnosis}

onChange={(e)=>

setForm({

...form,

diagnosis:e.target.value

})

}

/>





<textarea

className="border p-3 rounded md:col-span-2"

placeholder="Doctor Notes"

value={form.doctorNotes}

onChange={(e)=>

setForm({

...form,

doctorNotes:e.target.value

})

}

/>




<input

type="date"

className="border p-3 rounded"

value={form.followUpDate}

onChange={(e)=>

setForm({

...form,

followUpDate:e.target.value

})

}

/>



</div>








<h2 className="text-xl font-bold mt-6 mb-3">

Medicines

</h2>







{

form.medicines.map((med,index)=>(


<div

key={index}

className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3"

>


<input

placeholder="Medicine Name"

className="border p-2 rounded"

value={med.name}

onChange={(e)=>

updateMedicine(

index,

"name",

e.target.value

)

}

/>





<input

placeholder="Dosage"

className="border p-2 rounded"

value={med.dosage}

onChange={(e)=>

updateMedicine(

index,

"dosage",

e.target.value

)

}

/>





<input

placeholder="Duration"

className="border p-2 rounded"

value={med.duration}

onChange={(e)=>

updateMedicine(

index,

"duration",

e.target.value

)

}

/>





<input

placeholder="Instructions"

className="border p-2 rounded"

value={med.instructions}

onChange={(e)=>

updateMedicine(

index,

"instructions",

e.target.value

)

}

/>







<button

onClick={()=>removeMedicine(index)}

className="bg-red-500 text-white rounded"

>

Remove

</button>



</div>


))

}








<div className="mt-5">


<button

onClick={addMedicine}

className="bg-blue-600 text-white px-5 py-2 rounded mr-3"

>

+ Add Medicine

</button>





<button

onClick={savePrescription}

className="bg-green-600 text-white px-5 py-2 rounded"

>


{

editMode

?

"Update Prescription"

:

"Save Prescription"

}


</button>


</div>





</div>









<div className="bg-white shadow rounded-xl p-6 mt-8">


<h2 className="text-xl font-bold mb-4">

Prescription List

</h2>





<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="bg-slate-100">


<th className="p-3 text-left">
Patient
</th>


<th className="p-3 text-left">
Doctor
</th>


<th className="p-3 text-left">
Diagnosis
</th>


<th className="p-3 text-left">
Medicines
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>







<tbody>


{

prescriptions.map(item=>(


<tr

key={item._id}

className="border-b"

>



<td className="p-3">

{item.patient?.name}

</td>




<td className="p-3">

{item.doctor?.name}

</td>





<td className="p-3">

{item.diagnosis}

</td>






<td className="p-3">


{

item.medicines?.map((m,i)=>(

<div key={i}>

{m.name}

</div>

))

}


</td>







<td className="p-3">


<button

onClick={()=>editPrescription(item)}

className="text-blue-600 mr-3"

>

Edit

</button>





<button

onClick={()=>deletePrescription(item._id)}

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






</div>


);


};


export default Prescriptions;