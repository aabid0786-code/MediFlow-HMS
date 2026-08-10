const express = require("express");
const Doctor = require("../models/Doctor");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add Doctor
router.post("/", authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.create({

            ...req.body,
            createdBy: req.user.id

        });


        res.status(201).json({

            message: "Doctor added successfully",
            doctor

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// Get All Doctors
router.get("/", authMiddleware, async (req, res) => {

    try {

        const doctors = await Doctor.find()
            .populate("createdBy", "name email");


        res.json({

            message: "Doctors fetched successfully",
            doctors

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// Get Single Doctor
router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id)
            .populate("createdBy", "name email");


        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }


        res.json({

            message: "Doctor fetched successfully",
            doctor

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// Update Doctor
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );


        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }


        res.json({

            message: "Doctor updated successfully",
            doctor

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



// Delete Doctor
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findByIdAndDelete(req.params.id);


        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }


        res.json({

            message: "Doctor deleted successfully"

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


module.exports = router;