import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";


import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import Ambulance from "./pages/Ambulance";
import BloodBank from "./pages/BloodBank";
import Settings from "./pages/Settings";




const ProtectedRoute = ({children}) => {


const token = localStorage.getItem("token");


if(!token){

return <Navigate to="/login" />;

}


return children;


};






function App(){


return (

<BrowserRouter>


<Routes>



<Route

path="/login"

element={<Login />}

/>





<Route

path="/"

element={

<ProtectedRoute>

<AdminLayout />

</ProtectedRoute>

}

>


<Route index element={<Dashboard />} />


<Route path="patients" element={<Patients />} />


<Route path="doctors" element={<Doctors />} />


<Route path="appointments" element={<Appointments />} />


<Route path="prescriptions" element={<Prescriptions />} />


<Route path="pharmacy" element={<Pharmacy />} />


<Route path="laboratory" element={<Laboratory />} />


<Route path="billing" element={<Billing />} />


<Route path="inventory" element={<Inventory />} />


<Route path="ambulance" element={<Ambulance />} />


<Route path="blood-bank" element={<BloodBank />} />


<Route path="settings" element={<Settings />} />


</Route>



</Routes>


</BrowserRouter>

);


}



export default App;