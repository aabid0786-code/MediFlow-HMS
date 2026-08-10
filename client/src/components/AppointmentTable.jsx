const AppointmentTable = () => {

  const appointments = [
    {
      patient: "Rahul Kumar",
      doctor: "Dr. Sharma",
      date: "02 Aug 2026",
      status: "Confirmed"
    },
    {
      patient: "Amit Verma",
      doctor: "Dr. Khan",
      date: "02 Aug 2026",
      status: "Pending"
    },
    {
      patient: "Sara Ali",
      doctor: "Dr. Singh",
      date: "02 Aug 2026",
      status: "Completed"
    }
  ];


  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8 w-full">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Recent Appointments
      </h2>


      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-slate-100">

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

            {
              appointments.map((item,index)=>(
                
                <tr 
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">
                    {item.patient}
                  </td>

                  <td className="p-4">
                    {item.doctor}
                  </td>

                  <td className="p-4">
                    {item.date}
                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {item.status}
                    </span>

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


export default AppointmentTable;