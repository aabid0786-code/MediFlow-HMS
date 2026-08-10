import { useState } from "react";


const Inventory = () => {


  const [search,setSearch] = useState("");

  const [showForm,setShowForm] = useState(false);



  const [items,setItems] = useState([

    {
      id:1,
      name:"Surgical Gloves",
      category:"Medical",
      quantity:500,
      supplier:"MedSupply",
      status:"In Stock"
    },

    {
      id:2,
      name:"Oxygen Cylinder",
      category:"Equipment",
      quantity:25,
      supplier:"HealthCare",
      status:"Available"
    },

    {
      id:3,
      name:"Syringe",
      category:"Medical",
      quantity:1000,
      supplier:"PharmaCare",
      status:"In Stock"
    }

  ]);




  const [newItem,setNewItem] = useState({

    name:"",
    category:"",
    quantity:"",
    supplier:"",
    status:"In Stock"

  });





  const filteredItems = items.filter((item)=>

    item.name.toLowerCase().includes(search.toLowerCase()) ||

    item.category.toLowerCase().includes(search.toLowerCase()) ||

    item.supplier.toLowerCase().includes(search.toLowerCase())

  );





  const addItem = ()=>{


    const item={

      id:items.length+1,

      ...newItem,

      quantity:Number(newItem.quantity)

    };


    setItems([...items,item]);


    setNewItem({

      name:"",
      category:"",
      quantity:"",
      supplier:"",
      status:"In Stock"

    });


    setShowForm(false);


  };





  const deleteItem=(id)=>{


    setItems(

      items.filter((item)=>item.id!==id)

    );


  };





  const editItem=(item)=>{


    const name=prompt(

      "Update Item Name",

      item.name

    );


    if(name){

      setItems(

        items.map((old)=>

          old.id===item.id

          ? {...old,name:name}

          :old

        )

      );

    }


  };





  return (

    <div>


      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-slate-800">
            Inventory
          </h1>


          <p className="text-gray-600 mt-2">
            Manage hospital equipment and stock
          </p>


        </div>




        <button

          onClick={()=>setShowForm(true)}

          className="bg-blue-600 text-white px-5 py-3 rounded-lg"

        >

          + Add Item

        </button>


      </div>






      {
        showForm && (

          <div className="bg-white shadow-md rounded-xl p-6 mt-6">


            <h2 className="text-xl font-bold mb-4">
              Add New Inventory Item
            </h2>




            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              {

                Object.keys(newItem).map((field)=>(


                  field!=="status" &&


                  <input

                    key={field}

                    placeholder={field}

                    value={newItem[field]}

                    onChange={(e)=>

                      setNewItem({

                        ...newItem,

                        [field]:e.target.value

                      })

                    }

                    className="border p-3 rounded-lg"

                  />


                ))

              }


            </div>




            <button

              onClick={addItem}

              className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5 mr-3"

            >

              Save Item

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

          placeholder="Search inventory item..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="border p-3 rounded-lg w-full mb-5"

        />





        <table className="w-full">


          <thead>

            <tr className="bg-slate-100">


              <th className="p-4 text-left">
                ID
              </th>


              <th className="p-4 text-left">
                Item Name
              </th>


              <th className="p-4 text-left">
                Category
              </th>


              <th className="p-4 text-left">
                Quantity
              </th>


              <th className="p-4 text-left">
                Supplier
              </th>


              <th className="p-4 text-left">
                Status
              </th>


              <th className="p-4 text-left">
                Action
              </th>


            </tr>


          </thead>





          <tbody>


          {

            filteredItems.map((item)=>(


              <tr key={item.id} className="border-b">


                <td className="p-4">
                  {item.id}
                </td>


                <td className="p-4 font-medium">
                  {item.name}
                </td>


                <td className="p-4">
                  {item.category}
                </td>


                <td className="p-4">
                  {item.quantity}
                </td>


                <td className="p-4">
                  {item.supplier}
                </td>


                <td className="p-4">

                  <span className={`px-3 py-1 rounded-full ${
                    
                    item.quantity < 50

                    ?"bg-red-100 text-red-700"

                    :"bg-green-100 text-green-700"

                  }`}>

                    {item.status}

                  </span>


                </td>




                <td className="p-4">


                  <button

                    onClick={()=>editItem(item)}

                    className="text-blue-600 mr-3"

                  >

                    Edit

                  </button>



                  <button

                    onClick={()=>deleteItem(item.id)}

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


export default Inventory;