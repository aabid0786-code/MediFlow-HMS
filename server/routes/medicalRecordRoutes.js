const express = require("express");

const MedicalRecord = require("../models/MedicalRecord");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



// ===============================
// CREATE MEDICAL RECORD
// ===============================

router.post("/", authMiddleware, async (req, res) => {

    try {


        const medicalRecord = await MedicalRecord.create({

            ...req.body,

            createdBy: req.user.id

        });



        res.status(201).json({

            message: "Medical record created successfully",

            medicalRecord

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

});





// ===============================
// GET ALL MEDICAL RECORDS
// ===============================

router.get("/", authMiddleware, async (req, res) => {


    try {


        const medicalRecords = await MedicalRecord.find()

            .populate("patient", "name email phone")

            .populate("doctor", "name email specialization")

            .populate("appointment")

            .populate("prescription")

            .populate("createdBy", "name email");



        res.json({

            message: "Medical records fetched successfully",

            medicalRecords

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});





// ===============================
// GET SINGLE MEDICAL RECORD
// ===============================

router.get("/:id", authMiddleware, async (req, res) => {


    try {


        const medicalRecord = await MedicalRecord.findById(req.params.id)

            .populate("patient", "name email phone")

            .populate("doctor", "name email specialization")

            .populate("appointment")

            .populate("prescription")

            .populate("createdBy", "name email");



        if (!medicalRecord) {


            return res.status(404).json({

                message: "Medical record not found"

            });


        }



        res.json({

            message: "Medical record fetched successfully",

            medicalRecord

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});






// ===============================
// UPDATE MEDICAL RECORD
// ===============================

router.put("/:id", authMiddleware, async (req, res) => {


    try {


        const medicalRecord = await MedicalRecord.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );



        if (!medicalRecord) {


            return res.status(404).json({

                message: "Medical record not found"

            });


        }



        res.json({

            message: "Medical record updated successfully",

            medicalRecord

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});






// ===============================
// DELETE MEDICAL RECORD
// ===============================

router.delete("/:id", authMiddleware, async (req, res) => {


    try {


        const medicalRecord = await MedicalRecord.findByIdAndDelete(req.params.id);



        if (!medicalRecord) {


            return res.status(404).json({

                message: "Medical record not found"

            });


        }



        res.json({

            message: "Medical record deleted successfully"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});




module.exports = router;