import { useEffect, useState } from "react";


const Doctors = () => {


  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);



  const [newDoctor, setNewDoctor] = useState({

    name:"",
    email:"",
    phone:"",
    specialization:"",
    experience:"",
    availableDays:""

  });





  const token = localStorage.getItem("token");




  // FETCH DOCTORS

  const fetchDoctors = async()=>{


    try{


      const res = await fetch(

        "https://mediflow-hms-ufsa.onrender.com/api/doctors",

        {

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      const data = await res.json();



      setDoctors(data.doctors || []);



    }
    catch(error){


      console.log(error);


    }


  };





  useEffect(()=>{


    fetchDoctors();


  },[]);









  // ADD DOCTOR


  const addDoctor = async()=>{


    try{


      const res = await fetch(

        "https://mediflow-hms-ufsa.onrender.com/api/doctors",

        {

          method:"POST",

          headers:{


            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`


          },


          body:JSON.stringify({


            ...newDoctor,


            experience:Number(newDoctor.experience),


            availableDays:newDoctor.availableDays
            .split(",")


          })


        }

      );




      const data = await res.json();



      if(res.ok){


        setDoctors([

          ...doctors,

          data.doctor

        ]);


        setShowForm(false);



        setNewDoctor({

          name:"",
          email:"",
          phone:"",
          specialization:"",
          experience:"",
          availableDays:""

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









  // DELETE DOCTOR


  const deleteDoctor = async(id)=>{


    try{


      await fetch(

        `https://mediflow-hms-ufsa.onrender.com/api/doctors/${id}`,

        {

          method:"DELETE",

          headers:{

            Authorization:`Bearer ${token}`

          }

        }

      );



      setDoctors(

        doctors.filter(

          doctor=>doctor._id !== id

        )

      );



    }
    catch(error){


      console.log(error);


    }


  };








  const filteredDoctors = doctors.filter((doctor)=>


    doctor.name
    .toLowerCase()
    .includes(search.toLowerCase())

    ||

    doctor.specialization
    .toLowerCase()
    .includes(search.toLowerCase())


  );







return (


<div>



<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold">
Doctors
</h1>


<p className="text-gray-600 mt-2">
Manage hospital doctors
</p>


</div>




<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Add Doctor

</button>



</div>









{
showForm && (


<div className="bg-white shadow rounded-xl p-6 mt-6">


<h2 className="font-bold text-xl mb-4">
Add Doctor
</h2>



<div className="grid md:grid-cols-2 gap-4">


{

Object.keys(newDoctor).map((field)=>(


<input

key={field}

placeholder={field}

value={newDoctor[field]}

onChange={(e)=>

setNewDoctor({

...newDoctor,

[field]:e.target.value

})

}

className="border p-3 rounded-lg"

/>


))


}



</div>





<button

onClick={addDoctor}

className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5"

>

Save Doctor

</button>



</div>


)

}










<div className="bg-white rounded-xl shadow p-6 mt-6">



<input

placeholder="Search doctor..."

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
Email
</th>


<th className="p-3 text-left">
Specialization
</th>


<th className="p-3 text-left">
Phone
</th>


<th className="p-3 text-left">
Experience
</th>


<th className="p-3">
Action
</th>


</tr>

</thead>




<tbody>


{

filteredDoctors.map((doctor)=>(


<tr key={doctor._id} className="border-b">


<td className="p-3">
{doctor.name}
</td>


<td className="p-3">
{doctor.email}
</td>


<td className="p-3">
{doctor.specialization}
</td>


<td className="p-3">
{doctor.phone}
</td>


<td className="p-3">
{doctor.experience} Years
</td>



<td className="p-3">


<button

onClick={()=>deleteDoctor(doctor._id)}

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


export default Doctors;