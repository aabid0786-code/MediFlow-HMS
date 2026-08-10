import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import AppointmentTable from "../components/AppointmentTable";
import DashboardChart from "../components/DashboardChart";


const Dashboard = () => {

  const [dashboard, setDashboard] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalRevenue: 0
  });


  const [recent, setRecent] = useState({
    recentPatients: [],
    recentAppointments: [],
    recentBills: []
  });



  const fetchDashboard = async () => {

    try {

      const res = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/dashboard",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      const data = await res.json();


      if(data.dashboard){
        setDashboard(data.dashboard);
      }


    } catch(error){

      console.log(error);

    }

  };




  const fetchRecent = async () => {

    try {

      const res = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/dashboard/recent",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      const data = await res.json();


      if(data.recent){
        setRecent(data.recent);
      }


    } catch(error){

      console.log(error);

    }

  };





  useEffect(()=>{

    fetchDashboard();
    fetchRecent();

  },[]);







  const cards = [

    {
      title:"Total Patients",
      value:dashboard.totalPatients,
      icon:"🧑‍🤝‍🧑"
    },

    {
      title:"Doctors",
      value:dashboard.totalDoctors,
      icon:"👨‍⚕️"
    },


    {
      title:"Appointments",
      value:dashboard.totalAppointments,
      icon:"📅"
    },


    {
      title:"Revenue",
      value:`₹${dashboard.totalRevenue}`,
      icon:"💰"
    }

  ];







return (

<div>


<h1 className="text-3xl font-bold text-slate-800">
Hospital Dashboard
</h1>


<p className="text-gray-600 mt-2">
Welcome to MediFlow Hospital Management System
</p>





<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">


{
cards.map((card,index)=>(

<DashboardCard

key={index}

title={card.title}

value={card.value}

icon={card.icon}

/>

))
}


</div>





<DashboardChart />







<div className="mt-8">


<h2 className="text-2xl font-bold mb-5">
Recent Appointments
</h2>



<div className="bg-white shadow rounded-xl p-5">


<table className="w-full">


<thead>

<tr className="border-b">

<th className="text-left p-3">
Patient
</th>


<th className="text-left p-3">
Doctor
</th>


<th className="text-left p-3">
Date
</th>


<th className="text-left p-3">
Status
</th>


</tr>

</thead>



<tbody>


{

recent.recentAppointments.map((item)=>(


<tr key={item._id}
className="border-b">


<td className="p-3">

{item.patient?.name}

</td>


<td className="p-3">

{item.doctor?.name}

</td>


<td className="p-3">

{
new Date(item.appointmentDate)
.toLocaleDateString()
}

</td>


<td className="p-3">

{item.status}

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


export default Dashboard;