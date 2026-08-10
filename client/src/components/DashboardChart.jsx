import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const DashboardChart = () => {


  const patientData = [
    {
      month:"Jan",
      patients:400
    },
    {
      month:"Feb",
      patients:700
    },
    {
      month:"Mar",
      patients:900
    },
    {
      month:"Apr",
      patients:1200
    },
    {
      month:"May",
      patients:1500
    }
  ];


  const revenueData = [
    {
      month:"Jan",
      revenue:20000
    },
    {
      month:"Feb",
      revenue:35000
    },
    {
      month:"Mar",
      revenue:50000
    },
    {
      month:"Apr",
      revenue:75000
    },
    {
      month:"May",
      revenue:95000
    }
  ];


  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


      {/* Patient Growth */}

      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-bold mb-5">
          Patient Growth
        </h2>


        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={patientData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="patients"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>


      </div>



      {/* Revenue */}

      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-bold mb-5">
          Revenue Analytics
        </h2>


        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={revenueData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>


            <Bar
              dataKey="revenue"
              fill="#16a34a"
            />


          </BarChart>

        </ResponsiveContainer>


      </div>


    </div>

  );
};


export default DashboardChart;