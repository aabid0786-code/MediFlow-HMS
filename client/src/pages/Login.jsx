import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {


const navigate = useNavigate();


const [login,setLogin] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);



const loginHandler = async(e)=>{

e.preventDefault();


if(!login || !password){

alert("Please enter email/mobile and password");
return;

}


try{


setLoading(true);


const res = await fetch(
"https://mediflow-hms-ufsa.onrender.com/api/auth/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

login:login,
password:password

})

}
);



const data = await res.json();



console.log("LOGIN RESPONSE:",data);



if(!res.ok){

alert(data.message);
setLoading(false);
return;

}



localStorage.setItem(
"token",
data.token
);



localStorage.setItem(
"user",
JSON.stringify(data.user)
);



alert("Login Successful");


navigate("/");



}
catch(error){

console.log(error);

alert("Server not connected");

}
finally{

setLoading(false);

}


};





return (

<div className="min-h-screen flex items-center justify-center bg-slate-100">


<div className="bg-white shadow-xl rounded-xl p-8 w-96">


<h1 className="text-3xl font-bold text-center text-blue-600">
MediFlow
</h1>


<p className="text-center text-gray-600 mt-2 mb-6">
Hospital Management System
</p>




<form onSubmit={loginHandler}>


<label className="font-medium">
Email / Mobile
</label>


<input

type="text"

placeholder="Enter your email"

value={login}

onChange={(e)=>setLogin(e.target.value)}

className="border p-3 rounded-lg w-full mt-2 mb-4"

/>





<label className="font-medium">
Password
</label>


<input

type="password"

placeholder="Enter your password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="border p-3 rounded-lg w-full mt-2 mb-5"

/>





<button

disabled={loading}

className="bg-blue-600 text-white w-full p-3 rounded-lg"

>

{
loading ? "Logging in..." : "Login"
}

</button>



</form>





<div className="text-center text-sm text-gray-500 mt-5">

Demo Login

<br/>

Email: admin@mediflow.com

<br/>

Password: 123456

</div>



</div>


</div>


);


};


export default Login;