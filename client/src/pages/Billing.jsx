import { useEffect, useState } from "react";

const Billing = () => {

  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billings, setBillings] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    appointment: "",
    invoiceNumber: "",
    consultationCharge: 0,
    medicineCharge: 0,
    labCharge: 0,
    otherCharges: 0,
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    transactionId: "",
    notes: ""
  });


  // =========================
  // FETCH DATA
  // =========================

  const fetchData = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`
      };


      const patientRes = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/patients",
        { headers }
      );

      const patientData = await patientRes.json();

      setPatients(patientData.patients || []);


      const doctorRes = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/doctors",
        { headers }
      );

      const doctorData = await doctorRes.json();

      setDoctors(doctorData.doctors || []);


      const appointmentRes = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/appointments",
        { headers }
      );

      const appointmentData = await appointmentRes.json();

      setAppointments(
        appointmentData.appointments || []
      );


      // IMPORTANT: /api/billing
      const billingRes = await fetch(
        "https://mediflow-hms-ufsa.onrender.com/api/billing",
        { headers }
      );

      const billingData = await billingRes.json();

      setBillings(
        billingData.billings || []
      );


    } catch (error) {

      console.error("Fetch Error:", error);

    }

  };


  useEffect(() => {

    fetchData();

  }, []);


  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // OPEN CREATE FORM
  // =========================

  const openCreateForm = () => {

    setEditId(null);

    setForm({
      patient: "",
      doctor: "",
      appointment: "",
      invoiceNumber: `INV-${Date.now()}`,
      consultationCharge: 0,
      medicineCharge: 0,
      labCharge: 0,
      otherCharges: 0,
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      transactionId: "",
      notes: ""
    });

    setShowForm(true);

  };


  // =========================
  // SAVE / UPDATE BILL
  // =========================

  const saveBill = async () => {

    try {

      if (!form.patient) {

        alert("Please select patient");

        return;

      }


      if (!form.invoiceNumber) {

        alert("Invoice number required");

        return;

      }


      const url = editId

        ? `https://mediflow-hms-ufsa.onrender.com/api/billing/${editId}`

        : "https://mediflow-hms-ufsa.onrender.com/api/billing";


      const method = editId ? "PUT" : "POST";


      const res = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({

          ...form,

          consultationCharge:
            Number(form.consultationCharge) || 0,

          medicineCharge:
            Number(form.medicineCharge) || 0,

          labCharge:
            Number(form.labCharge) || 0,

          otherCharges:
            Number(form.otherCharges) || 0

        })

      });


      const data = await res.json();


      if (!res.ok) {

        alert(data.message || "Unable to save bill");

        return;

      }


      alert(
        editId
          ? "Bill updated successfully"
          : "Bill created successfully"
      );


      setShowForm(false);

      setEditId(null);

      setForm({
        patient: "",
        doctor: "",
        appointment: "",
        invoiceNumber: "",
        consultationCharge: 0,
        medicineCharge: 0,
        labCharge: 0,
        otherCharges: 0,
        paymentMethod: "Cash",
        paymentStatus: "Pending",
        transactionId: "",
        notes: ""
      });


      fetchData();


    } catch (error) {

      console.error("Save Bill Error:", error);

      alert("Server error");

    }

  };


  // =========================
  // EDIT BILL
  // =========================

  const editBill = (bill) => {

    setEditId(bill._id);

    setForm({

      patient: bill.patient?._id || "",

      doctor: bill.doctor?._id || "",

      appointment: bill.appointment?._id || "",

      invoiceNumber: bill.invoiceNumber || "",

      consultationCharge:
        bill.consultationCharge || 0,

      medicineCharge:
        bill.medicineCharge || 0,

      labCharge:
        bill.labCharge || 0,

      otherCharges:
        bill.otherCharges || 0,

      paymentMethod:
        bill.paymentMethod || "Cash",

      paymentStatus:
        bill.paymentStatus || "Pending",

      transactionId:
        bill.transactionId || "",

      notes:
        bill.notes || ""

    });


    setShowForm(true);

  };


  // =========================
  // DELETE BILL
  // =========================

  const deleteBill = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this bill?"
      );


    if (!confirmDelete) return;


    try {

      const res = await fetch(
        `https://mediflow-hms-ufsa.onrender.com/api/billing/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const data = await res.json();


      if (!res.ok) {

        alert(data.message || "Delete failed");

        return;

      }


      alert("Bill deleted successfully");

      fetchData();


    } catch (error) {

      console.error("Delete Error:", error);

      alert("Server error");

    }

  };


  // =========================
  // TOTAL
  // =========================

  const total =

    (Number(form.consultationCharge) || 0) +

    (Number(form.medicineCharge) || 0) +

    (Number(form.labCharge) || 0) +

    (Number(form.otherCharges) || 0);


  // =========================
  // UI
  // =========================

  return (

    <div>

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Billing
          </h1>

          <p className="text-gray-600 mt-2">
            Manage hospital invoices and payments
          </p>

        </div>


        <button

          onClick={openCreateForm}

          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"

        >

          + Create Invoice

        </button>

      </div>


      {/* FORM */}

      {showForm && (

        <div className="bg-white shadow-md rounded-xl p-6 mt-6">

          <h2 className="text-xl font-bold mb-5">

            {editId
              ? "Update Invoice"
              : "Create Invoice"}

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            {/* PATIENT */}

            <select

              name="patient"

              value={form.patient}

              onChange={handleChange}

              className="border p-3 rounded-lg"

            >

              <option value="">
                Select Patient
              </option>

              {patients.map((patient) => (

                <option
                  key={patient._id}
                  value={patient._id}
                >

                  {patient.name}

                </option>

              ))}

            </select>


            {/* DOCTOR */}

            <select

              name="doctor"

              value={form.doctor}

              onChange={handleChange}

              className="border p-3 rounded-lg"

            >

              <option value="">
                Select Doctor
              </option>

              {doctors.map((doctor) => (

                <option
                  key={doctor._id}
                  value={doctor._id}
                >

                  {doctor.name}

                </option>

              ))}

            </select>


            {/* APPOINTMENT */}

            <select

              name="appointment"

              value={form.appointment}

              onChange={handleChange}

              className="border p-3 rounded-lg"

            >

              <option value="">
                Select Appointment
              </option>

              {appointments.map((appointment) => (

                <option
                  key={appointment._id}
                  value={appointment._id}
                >

                  {appointment.patient?.name || "Patient"}

                  {" - "}

                  {appointment.doctor?.name || "Doctor"}

                </option>

              ))}

            </select>


            {/* INVOICE */}

            <input

              name="invoiceNumber"

              value={form.invoiceNumber}

              onChange={handleChange}

              placeholder="Invoice Number"

              className="border p-3 rounded-lg"

            />


            {/* CONSULTATION */}

            <input

              type="number"

              name="consultationCharge"

              value={form.consultationCharge}

              onChange={handleChange}

              placeholder="Consultation Charge"

              className="border p-3 rounded-lg"

            />


            {/* MEDICINE */}

            <input

              type="number"

              name="medicineCharge"

              value={form.medicineCharge}

              onChange={handleChange}

              placeholder="Medicine Charge"

              className="border p-3 rounded-lg"

            />


            {/* LAB */}

            <input

              type="number"

              name="labCharge"

              value={form.labCharge}

              onChange={handleChange}

              placeholder="Lab Charge"

              className="border p-3 rounded-lg"

            />


            {/* OTHER */}

            <input

              type="number"

              name="otherCharges"

              value={form.otherCharges}

              onChange={handleChange}

              placeholder="Other Charges"

              className="border p-3 rounded-lg"

            />


            {/* PAYMENT METHOD */}

            <select

              name="paymentMethod"

              value={form.paymentMethod}

              onChange={handleChange}

              className="border p-3 rounded-lg"

            >

              <option value="Cash">
                Cash
              </option>

              <option value="Card">
                Card
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Insurance">
                Insurance
              </option>

            </select>


            {/* PAYMENT STATUS */}

            <select

              name="paymentStatus"

              value={form.paymentStatus}

              onChange={handleChange}

              className="border p-3 rounded-lg"

            >

              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Partial">
                Partial
              </option>

            </select>


            {/* TRANSACTION */}

            <input

              name="transactionId"

              value={form.transactionId}

              onChange={handleChange}

              placeholder="Transaction ID"

              className="border p-3 rounded-lg"

            />


            {/* NOTES */}

            <textarea

              name="notes"

              value={form.notes}

              onChange={handleChange}

              placeholder="Notes"

              className="border p-3 rounded-lg"

            />

          </div>


          {/* TOTAL */}

          <div className="mt-5 bg-slate-100 p-4 rounded-lg">

            <span className="text-lg font-semibold">
              Total Amount:
            </span>

            <span className="text-2xl font-bold ml-3">
              ₹{total}
            </span>

          </div>


          <button

            onClick={saveBill}

            className="bg-green-600 text-white px-5 py-2 rounded-lg mt-5 mr-3 hover:bg-green-700"

          >

            {editId
              ? "Update Bill"
              : "Save Bill"}

          </button>


          <button

            onClick={() => {

              setShowForm(false);
              setEditId(null);

            }}

            className="bg-gray-500 text-white px-5 py-2 rounded-lg mt-5"

          >

            Cancel

          </button>

        </div>

      )}


      {/* BILL LIST */}

      <div className="bg-white shadow-md rounded-xl p-6 mt-8">

        <h2 className="text-xl font-bold mb-5">
          Bill List
        </h2>


        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100">

                <th className="p-4 text-left">
                  Invoice
                </th>

                <th className="p-4 text-left">
                  Patient
                </th>

                <th className="p-4 text-left">
                  Doctor
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

                <th className="p-4 text-left">
                  Method
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

              {billings.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-500"
                  >

                    No bills found

                  </td>

                </tr>

              ) : (

                billings.map((bill) => (

                  <tr
                    key={bill._id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4 font-medium">
                      {bill.invoiceNumber}
                    </td>

                    <td className="p-4">
                      {bill.patient?.name || "-"}
                    </td>

                    <td className="p-4">
                      {bill.doctor?.name || "-"}
                    </td>

                    <td className="p-4 font-bold">
                      ₹{bill.totalAmount}
                    </td>

                    <td className="p-4">
                      {bill.paymentMethod}
                    </td>

                    <td className="p-4">

                      <span
                        className={
                          bill.paymentStatus === "Paid"

                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"

                            : bill.paymentStatus === "Partial"

                            ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"

                            : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                        }
                      >

                        {bill.paymentStatus}

                      </span>

                    </td>

                    <td className="p-4">

                      <button

                        onClick={() => editBill(bill)}

                        className="text-blue-600 mr-4"

                      >

                        Edit

                      </button>


                      <button

                        onClick={() => deleteBill(bill._id)}

                        className="text-red-600"

                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};


export default Billing;