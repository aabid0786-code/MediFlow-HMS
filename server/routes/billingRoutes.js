const express = require("express");

const Billing = require("../models/Billing");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



// ===============================
// CREATE BILLING
// ===============================

router.post("/", authMiddleware, async (req, res) => {


    try {


        const billing = await Billing.create({

            ...req.body,

            createdBy: req.user.id

        });



        res.status(201).json({

            message: "Bill created successfully",

            billing

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});





// ===============================
// GET ALL BILLINGS
// ===============================

router.get("/", authMiddleware, async (req, res) => {


    try {


        const billings = await Billing.find()

            .populate("patient", "name email phone")

            .populate("doctor", "name email specialization")

            .populate("appointment")

            .populate("createdBy", "name email");



        res.json({

            message: "Bills fetched successfully",

            billings

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});





// ===============================
// GET SINGLE BILL
// ===============================

router.get("/:id", authMiddleware, async (req, res) => {


    try {


        const billing = await Billing.findById(req.params.id)

            .populate("patient", "name email phone")

            .populate("doctor", "name email specialization")

            .populate("appointment")

            .populate("createdBy", "name email");



        if (!billing) {


            return res.status(404).json({

                message: "Bill not found"

            });


        }



        res.json({

            message: "Bill fetched successfully",

            billing

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});






// ===============================
// UPDATE BILL
// ===============================

router.put("/:id", authMiddleware, async (req, res) => {


    try {


        const billing = await Billing.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );



        if (!billing) {


            return res.status(404).json({

                message: "Bill not found"

            });


        }



        res.json({

            message: "Bill updated successfully",

            billing

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});






// ===============================
// DELETE BILL
// ===============================

router.delete("/:id", authMiddleware, async (req, res) => {


    try {


        const billing = await Billing.findByIdAndDelete(req.params.id);



        if (!billing) {


            return res.status(404).json({

                message: "Bill not found"

            });


        }



        res.json({

            message: "Bill deleted successfully"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});



module.exports = router;