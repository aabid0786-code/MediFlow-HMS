import { useNavigate } from "react-router-dom";


const Navbar = () => {


  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const mobile = user?.mobile || "XXXXXXXXXX";

  const name = user?.name || "Admin";



  const logout = () => {


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/login");


  };




  return (


    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 rounded-xl">



      {/* Search */}


      <div>

        <input

          type="text"

          placeholder="Search patients, doctors..."

          className="border rounded-lg px-4 py-2 w-80 outline-none focus:ring-2 focus:ring-blue-500"

        />

      </div>





      {/* Right Side */}


      <div className="flex items-center gap-5">



        <button className="text-xl">

          🔔

        </button>







        <div className="flex items-center gap-3">



          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">

            {name.charAt(0).toUpperCase()}

          </div>





          <div>


            <p className="font-semibold">

              {name}

            </p>



            <p className="text-sm text-gray-500">

              +91 {mobile}

            </p>


          </div>






          <button


            onClick={logout}


            className="ml-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"


          >

            Logout

          </button>





        </div>



      </div>



    </header>


  );


};


export default Navbar;