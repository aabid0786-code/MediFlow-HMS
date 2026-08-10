const express = require("express");

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const MedicalRecord = require("../models/MedicalRecord");
const Billing = require("../models/Billing");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



// ===============================
// DASHBOARD SUMMARY
// ===============================

router.get("/", authMiddleware, async (req, res) => {


    try {


        const totalPatients = await Patient.countDocuments();


        const totalDoctors = await Doctor.countDocuments();


        const totalAppointments = await Appointment.countDocuments();


        const totalPrescriptions = await Prescription.countDocuments();


        const totalMedicalRecords = await MedicalRecord.countDocuments();



        const revenue = await Billing.aggregate([

            {

                $match: {

                    paymentStatus: "Paid"

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: "$totalAmount"

                    }

                }

            }

        ]);



        const totalRevenue = revenue.length > 0
            ? revenue[0].totalRevenue
            : 0;



        res.json({

            message: "Dashboard data fetched successfully",

            dashboard: {

                totalPatients,

                totalDoctors,

                totalAppointments,

                totalPrescriptions,

                totalMedicalRecords,

                totalRevenue

            }

        });



    } catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});





// ===============================
// RECENT DATA
// ===============================

router.get("/recent", authMiddleware, async(req,res)=>{


    try{


        const recentPatients = await Patient.find()

        .sort({createdAt:-1})

        .limit(5)

        .select("name email phone");



        const recentAppointments = await Appointment.find()

        .sort({createdAt:-1})

        .limit(5)

        .populate("patient","name")

        .populate("doctor","name");



        const recentBills = await Billing.find()

        .sort({createdAt:-1})

        .limit(5)

        .populate("patient","name")

        .select("invoiceNumber totalAmount paymentStatus");



        res.json({

            message:"Recent dashboard data fetched successfully",

            recent:{

                recentPatients,

                recentAppointments,

                recentBills

            }

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});



module.exports = router;