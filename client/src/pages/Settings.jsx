import { useState } from "react";


const Settings = () => {


  const defaultData = {
    hospitalName: "MediFlow Hospital",
    contact: "+91 9876543210",
    email: "info@mediflow.com",
    adminName: "Admin",
    address: "Lucknow, Uttar Pradesh, India"
  };



  const [hospital, setHospital] = useState(()=>{

    const saved = localStorage.getItem("hospitalProfile");

    return saved 
      ? JSON.parse(saved)
      : defaultData;

  });



  const handleChange = (e)=>{

    setHospital({

      ...hospital,

      [e.target.name]: e.target.value

    });

  };



  const saveSettings = ()=>{

    localStorage.setItem(
      "hospitalProfile",
      JSON.stringify(hospital)
    );


    alert("Hospital Profile Saved Successfully");

  };




  return (

    <div>


      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-600 mt-2">
          Manage hospital profile and system settings
        </p>

      </div>





      <div className="bg-white rounded-xl shadow-md p-6 mt-8">


        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Hospital Profile
        </h2>





        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



          <div>

            <label className="block mb-2 text-gray-600">
              Hospital Name
            </label>

            <input

              name="hospitalName"

              value={hospital.hospitalName}

              onChange={handleChange}

              className="border p-3 rounded-lg w-full"

            />

          </div>





          <div>

            <label className="block mb-2 text-gray-600">
              Contact Number
            </label>

            <input

              name="contact"

              value={hospital.contact}

              onChange={handleChange}

              className="border p-3 rounded-lg w-full"

            />

          </div>





          <div>

            <label className="block mb-2 text-gray-600">
              Email
            </label>


            <input

              name="email"

              value={hospital.email}

              onChange={handleChange}

              className="border p-3 rounded-lg w-full"

            />

          </div>






          <div>

            <label className="block mb-2 text-gray-600">
              Admin Name
            </label>


            <input

              name="adminName"

              value={hospital.adminName}

              onChange={handleChange}

              className="border p-3 rounded-lg w-full"

            />


          </div>






          <div className="md:col-span-2">


            <label className="block mb-2 text-gray-600">
              Hospital Address
            </label>


            <textarea

              name="address"

              value={hospital.address}

              onChange={handleChange}

              className="border p-3 rounded-lg w-full h-28"

            />


          </div>



        </div>





        <button

          onClick={saveSettings}

          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

        >

          Save Settings

        </button>



      </div>


    </div>

  );

};


export default Settings;