const express = require("express");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// Add Patient
// =========================
router.post("/", authMiddleware, async (req, res) => {

    try {

        const patient = await Patient.create({

            ...req.body,
            createdBy: req.user.id

        });

        res.status(201).json({

            message: "Patient added successfully",
            patient

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// =========================
// Get All Patients
// =========================
router.get("/", authMiddleware, async (req, res) => {

    try {

        const patients = await Patient.find()
            .populate("createdBy", "name email");

        res.json({

            message: "Patients fetched successfully",
            patients

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// =========================
// Get Single Patient
// =========================
router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const patient = await Patient.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }

        res.json({

            message: "Patient fetched successfully",
            patient

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// =========================
// Update Patient
// =========================
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const patient = await Patient.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }

        res.json({

            message: "Patient updated successfully",
            patient

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// =========================
// Delete Patient
// =========================
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }

        res.json({

            message: "Patient deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;