import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {


return (

<div className="flex min-h-screen bg-slate-100">


<Sidebar />


<div className="flex-1 p-6 overflow-hidden">


<Navbar />


<main className="mt-6 w-full">

<Outlet />

</main>


</div>


</div>

);


};


export default AdminLayout;