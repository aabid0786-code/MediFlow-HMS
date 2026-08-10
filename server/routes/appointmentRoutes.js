const express = require("express");
const mongoose = require("mongoose");

const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// CREATE APPOINTMENT
// ===============================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const appointment = await Appointment.create({

            patient: new mongoose.Types.ObjectId(req.body.patient),

            doctor: new mongoose.Types.ObjectId(req.body.doctor),

            appointmentDate: req.body.appointmentDate,

            appointmentTime: req.body.appointmentTime,

            appointmentType: req.body.appointmentType,

            symptoms: req.body.symptoms,

            diagnosis: req.body.diagnosis,

            notes: req.body.notes,

            status: req.body.status,

            createdBy: req.user.id

        });


        res.status(201).json({

            message: "Appointment created successfully",

            appointment

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// ===============================
// GET ALL APPOINTMENTS
// ===============================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const appointments = await Appointment.find()
            .populate("patient", "name email phone")
            .populate("doctor", "name email specialization")
            .populate("createdBy", "name email");


        res.json({

            message: "Appointments fetched successfully",

            appointments

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// ===============================
// GET SINGLE APPOINTMENT
// ===============================

router.get("/:id", authMiddleware, async (req, res) => {

    try {


        const appointment = await Appointment.findById(req.params.id)

        .populate("patient", "name email phone")

        .populate("doctor", "name email specialization");



        if (!appointment) {

            return res.status(404).json({

                message: "Appointment not found"

            });

        }


        res.json({

            message: "Appointment fetched successfully",

            appointment

        });



    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// ===============================
// UPDATE APPOINTMENT
// ===============================

router.put("/:id", authMiddleware, async (req, res) => {

    try {


        const appointment = await Appointment.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!appointment) {

            return res.status(404).json({

                message: "Appointment not found"

            });

        }


        res.json({

            message: "Appointment updated successfully",

            appointment

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

});



// ===============================
// DELETE APPOINTMENT
// ===============================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {


        const appointment = await Appointment.findByIdAndDelete(req.params.id);



        if (!appointment) {

            return res.status(404).json({

                message: "Appointment not found"

            });

        }


        res.json({

            message: "Appointment deleted successfully"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

});



module.exports = router;