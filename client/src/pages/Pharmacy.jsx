import { useState } from "react";


const Pharmacy = () => {


  const [search,setSearch] = useState("");

  const [showForm,setShowForm] = useState(false);



  const [medicines,setMedicines] = useState([

    {
      id:1,
      name:"Paracetamol",
      category:"Tablet",
      stock:500,
      price:"₹20",
      expiry:"Dec 2027",
      status:"Available"
    },

    {
      id:2,
      name:"Azithromycin",
      category:"Antibiotic",
      stock:200,
      price:"₹120",
      expiry:"Jan 2028",
      status:"Available"
    },

    {
      id:3,
      name:"Insulin",
      category:"Injection",
      stock:50,
      price:"₹450",
      expiry:"Mar 2027",
      status:"Low Stock"
    }

  ]);





  const [newMedicine,setNewMedicine] = useState({

    name:"",
    category:"",
    stock:"",
    price:"",
    expiry:""

  });





  const filteredMedicines = medicines.filter((medicine)=>

    medicine.name.toLowerCase().includes(search.toLowerCase()) ||

    medicine.category.toLowerCase().includes(search.toLowerCase())

  );





  const addMedicine = ()=>{


    if(!newMedicine.name || !newMedicine.category){

      alert("Medicine name and category required");

      return;

    }



    const medicine={

      id:Date.now(),

      ...newMedicine,

      stock:Number(newMedicine.stock),

      status:
      Number(newMedicine.stock)<100
      ?
      "Low Stock"
      :
      "Available"

    };



    setMedicines([

      ...medicines,

      medicine

    ]);



    setNewMedicine({

      name:"",
      category:"",
      stock:"",
      price:"",
      expiry:""

    });



    setShowForm(false);


  };






  const deleteMedicine=(id)=>{


    setMedicines(

      medicines.filter(

        item=>item.id!==id

      )

    );


  };






  const editMedicine=(medicine)=>{


    const name = prompt(

      "Update Medicine Name",

      medicine.name

    );



    if(name){


      setMedicines(

        medicines.map(item=>

          item.id===medicine.id

          ?

          {
            ...item,
            name
          }

          :

          item

        )

      );


    }


  };







return (

<div>



<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-slate-800">
Pharmacy
</h1>


<p className="text-gray-600 mt-2">
Manage medicines and stock
</p>


</div>




<button

onClick={()=>setShowForm(true)}

className="bg-blue-600 text-white px-5 py-3 rounded-lg"

>

+ Add Medicine

</button>


</div>







{

showForm &&

<div className="bg-white shadow-md rounded-xl p-6 mt-6">


<h2 className="text-xl font-bold mb-4">
Add New Medicine
</h2>



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">


{

Object.keys(newMedicine).map(field=>(


<input

key={field}

placeholder={field}

value={newMedicine[field]}

onChange={(e)=>

setNewMedicine({

...newMedicine,

[field]:e.target.value

})

}

className="border p-3 rounded-lg"

/>


))

}


</div>




<button

onClick={addMedicine}

className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5 mr-3"

>

Save Medicine

</button>




<button

onClick={()=>setShowForm(false)}

className="bg-gray-500 text-white px-5 py-2 rounded-lg mt-5"

>

Cancel

</button>


</div>


}








<div className="bg-white rounded-xl shadow-md p-6 mt-8">



<input

type="text"

placeholder="Search medicine..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-full mb-5"

/>






<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="bg-slate-100">


<th className="p-4 text-left">ID</th>

<th className="p-4 text-left">Medicine</th>

<th className="p-4 text-left">Category</th>

<th className="p-4 text-left">Stock</th>

<th className="p-4 text-left">Price</th>

<th className="p-4 text-left">Expiry</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Action</th>


</tr>


</thead>





<tbody>


{

filteredMedicines.map(medicine=>(


<tr key={medicine.id} className="border-b">



<td className="p-4">
{medicine.id}
</td>


<td className="p-4 font-medium">
{medicine.name}
</td>


<td className="p-4">
{medicine.category}
</td>


<td className="p-4">
{medicine.stock}
</td>


<td className="p-4">
{medicine.price}
</td>


<td className="p-4">
{medicine.expiry}
</td>



<td className="p-4">


<span className={

medicine.status==="Low Stock"

?

"bg-red-100 text-red-700 px-3 py-1 rounded-full"

:

"bg-green-100 text-green-700 px-3 py-1 rounded-full"

}>


{medicine.status}


</span>


</td>




<td className="p-4">


<button

onClick={()=>editMedicine(medicine)}

className="text-blue-600 mr-3"

>

Edit

</button>



<button

onClick={()=>deleteMedicine(medicine.id)}

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


export default Pharmacy;