import { NavLink } from "react-router-dom";


const Sidebar = () => {


const menu = [

{
name:"Dashboard",
path:"/"
},

{
name:"Doctors",
path:"/doctors"
},

{
name:"Patients",
path:"/patients"
},

{
name:"Appointments",
path:"/appointments"
},

{
name:"Prescriptions",
path:"/prescriptions"
},

{
name:"Pharmacy",
path:"/pharmacy"
},

{
name:"Laboratory",
path:"/laboratory"
},

{
name:"Billing",
path:"/billing"
},

{
name:"Inventory",
path:"/inventory"
},

{
name:"Ambulance",
path:"/ambulance"
},

{
name:"Blood Bank",
path:"/blood-bank"
},

{
name:"Settings",
path:"/settings"
}

];




return (

<div className="w-64 bg-slate-900 text-white min-h-screen p-5">


<h1 className="text-2xl font-bold mb-8">
🏥 MediFlow
</h1>



<p className="text-gray-400 mb-5">
Hospital Management
</p>




<nav className="space-y-2">


{

menu.map((item,index)=>(


<NavLink

key={index}

to={item.path}

className={({isActive})=>

`block px-4 py-3 rounded-lg transition ${
isActive
?
"bg-blue-600"
:
"hover:bg-slate-700"
}`

}

>


{item.name}


</NavLink>


))


}


</nav>



</div>

);


};



export default Sidebar;