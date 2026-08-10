import { useState } from "react";


const Laboratory = () => {


  const [search,setSearch] = useState("");

  const [showForm,setShowForm] = useState(false);



  const [tests,setTests] = useState([

    {
      id:1,
      patient:"Rahul Kumar",
      test:"Blood Test",
      doctor:"Dr. Jakir Ahmad",
      date:"02 Aug 2026",
      result:"Normal",
      status:"Completed"
    },

    {
      id:2,
      patient:"Sara Ali",
      test:"MRI Scan",
      doctor:"Dr. Khan",
      date:"02 Aug 2026",
      result:"Pending",
      status:"Pending"
    },

    {
      id:3,
      patient:"Amit Verma",
      test:"X-Ray",
      doctor:"Dr. Sharma",
      date:"03 Aug 2026",
      result:"Normal",
      status:"Completed"
    }

  ]);





  const [newTest,setNewTest] = useState({

    patient:"",
    test:"",
    doctor:"",
    date:"",
    result:"Pending",
    status:"Pending"

  });






  const filteredTests = tests.filter((item)=>

    item.patient.toLowerCase().includes(search.toLowerCase()) ||

    item.test.toLowerCase().includes(search.toLowerCase()) ||

    item.doctor.toLowerCase().includes(search.toLowerCase())

  );





  const addTest=()=>{


    const data={

      id:tests.length+1,

      ...newTest

    };


    setTests([...tests,data]);


    setNewTest({

      patient:"",
      test:"",
      doctor:"",
      date:"",
      result:"Pending",
      status:"Pending"

    });


    setShowForm(false);


  };






  const deleteTest=(id)=>{


    setTests(

      tests.filter((item)=>item.id!==id)

    );


  };





  const viewReport=(item)=>{

    alert(

      `Patient: ${item.patient}\nTest: ${item.test}\nResult: ${item.result}`

    );

  };






return (

<div>


<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">
Laboratory
</h1>


<p className="text-gray-600 mt-2">
Manage laboratory tests and reports
</p>


</div>



<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Add Lab Test

</button>


</div>





{
showForm && (

<div className="bg-white shadow-md rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">
Add Lab Test
</h2>



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">


{
Object.keys(newTest).map((field)=>(


field!=="result" && field!=="status" &&


<input

key={field}

placeholder={field}

value={newTest[field]}

onChange={(e)=>

setNewTest({

...newTest,

[field]:e.target.value

})

}

className="border p-3 rounded-lg"

/>


))

}



</div>



<button

onClick={addTest}

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

placeholder="Search patient or test..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-full mb-5"

/>





<table className="w-full">


<thead>

<tr className="bg-slate-100">


<th className="p-4 text-left">ID</th>

<th className="p-4 text-left">Patient</th>

<th className="p-4 text-left">Test</th>

<th className="p-4 text-left">Doctor</th>

<th className="p-4 text-left">Date</th>

<th className="p-4 text-left">Result</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Action</th>


</tr>

</thead>





<tbody>


{

filteredTests.map((item)=>(


<tr key={item.id} className="border-b">


<td className="p-4">
{item.id}
</td>


<td className="p-4 font-medium">
{item.patient}
</td>


<td className="p-4">
{item.test}
</td>


<td className="p-4">
{item.doctor}
</td>


<td className="p-4">
{item.date}
</td>


<td className="p-4">
{item.result}
</td>


<td className="p-4">


<span className={`px-3 py-1 rounded-full ${
item.status==="Pending"
?"bg-yellow-100 text-yellow-700"
:"bg-green-100 text-green-700"
}`}>

{item.status}

</span>


</td>



<td className="p-4">


<button

onClick={()=>viewReport(item)}

className="text-blue-600 mr-3"

>

View

</button>



<button

onClick={()=>deleteTest(item.id)}

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


export default Laboratory;