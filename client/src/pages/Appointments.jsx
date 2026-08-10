import { useEffect, useState } from "react";


const Appointments = () => {


const token = localStorage.getItem("token");



const [appointments,setAppointments] = useState([]);

const [patients,setPatients] = useState([]);

const [doctors,setDoctors] = useState([]);


const [showForm,setShowForm] = useState(false);



const [form,setForm] = useState({

patient:"",
doctor:"",
appointmentDate:"",
appointmentTime:"",
appointmentType:"Consultation",
symptoms:"",
status:"Pending"

});






// GET DATA

const fetchData = async()=>{


try{


const patientRes = await fetch(

"http://localhost:5000/api/patients",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



const patientData = await patientRes.json();


setPatients(patientData.patients || []);






const doctorRes = await fetch(

"http://localhost:5000/api/doctors",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



const doctorData = await doctorRes.json();


setDoctors(doctorData.doctors || []);







const appointmentRes = await fetch(

"http://localhost:5000/api/appointments",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



const appointmentData = await appointmentRes.json();


setAppointments(

appointmentData.appointments || []

);




}

catch(error){

console.log(error);

}


};





useEffect(()=>{

fetchData();

},[]);









// CREATE APPOINTMENT


const saveAppointment = async()=>{


try{


const res = await fetch(

"http://localhost:5000/api/appointments",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},


body:JSON.stringify(form)


}

);



const data = await res.json();



if(res.ok){


alert("Appointment created");


setShowForm(false);


setForm({

patient:"",
doctor:"",
appointmentDate:"",
appointmentTime:"",
appointmentType:"Consultation",
symptoms:"",
status:"Pending"

});


fetchData();


}

else{


alert(data.message);


}



}


catch(error){

console.log(error);

}


};








// DELETE


const deleteAppointment = async(id)=>{


await fetch(

`http://localhost:5000/api/appointments/${id}`,

{

method:"DELETE",

headers:{

Authorization:`Bearer ${token}`

}

}

);



fetchData();


};








return (


<div>



<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">

Appointments

</h1>


<p className="text-gray-600 mt-2">

Manage patient appointments

</p>


</div>




<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Book Appointment

</button>


</div>









{

showForm && (


<div className="bg-white shadow rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">

Book Appointment

</h2>




<div className="grid md:grid-cols-2 gap-4">





<select

className="border p-3 rounded-lg"

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

patients.map((p)=>(


<option key={p._id} value={p._id}>

{p.name}

</option>


))

}


</select>









<select

className="border p-3 rounded-lg"

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

doctors.map((d)=>(


<option key={d._id} value={d._id}>

{d.name}

</option>


))

}



</select>







<input

type="date"

className="border p-3 rounded-lg"

value={form.appointmentDate}

onChange={(e)=>

setForm({

...form,

appointmentDate:e.target.value

})

}


/>







<input

type="time"

className="border p-3 rounded-lg"

value={form.appointmentTime}

onChange={(e)=>

setForm({

...form,

appointmentTime:e.target.value

})

}


/>








<select

className="border p-3 rounded-lg"

value={form.appointmentType}

onChange={(e)=>

setForm({

...form,

appointmentType:e.target.value

})

}

>


<option>

Consultation

</option>

<option>

Follow-up

</option>

<option>

Emergency

</option>

<option>

Routine Checkup

</option>


</select>







<input

placeholder="Symptoms"

className="border p-3 rounded-lg"

value={form.symptoms}

onChange={(e)=>

setForm({

...form,

symptoms:e.target.value

})

}

/>



</div>





<button

onClick={saveAppointment}

className="bg-green-600 text-white px-5 py-2 mt-5 rounded-lg"

>

Save Appointment

</button>




</div>


)

}









<div className="bg-white rounded-xl shadow p-6 mt-8">



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
Date
</th>


<th className="p-3 text-left">
Time
</th>


<th className="p-3 text-left">
Status
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>





<tbody>


{

appointments.map((a)=>(


<tr key={a._id} className="border-b">


<td className="p-3">

{a.patient?.name}

</td>



<td className="p-3">

{a.doctor?.name}

</td>



<td className="p-3">

{
new Date(a.appointmentDate)
.toLocaleDateString()
}

</td>



<td className="p-3">

{a.appointmentTime}

</td>




<td className="p-3">

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

{a.status}

</span>

</td>





<td className="p-3">


<button

onClick={()=>deleteAppointment(a._id)}

className="text-red-600"

>

Cancel

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


export default Appointments;