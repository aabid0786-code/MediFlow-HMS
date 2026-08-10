const express = require("express");

const Prescription = require("../models/Prescription");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



// ===============================
// CREATE PRESCRIPTION
// ===============================

router.post("/", authMiddleware, async (req,res)=>{

    try{


        const prescription = await Prescription.create({

            ...req.body,

            createdBy: req.user.id

        });



        res.status(201).json({

            message:"Prescription created successfully",

            prescription

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});




// ===============================
// GET ALL PRESCRIPTIONS
// ===============================


router.get("/", authMiddleware, async(req,res)=>{


    try{


        const prescriptions = await Prescription.find()

        .populate("patient","name email phone")

        .populate("doctor","name email specialization")

        .populate("appointment")

        .populate("createdBy","name email");



        res.json({

            message:"Prescriptions fetched successfully",

            prescriptions

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});




// ===============================
// GET SINGLE PRESCRIPTION
// ===============================


router.get("/:id", authMiddleware, async(req,res)=>{


    try{


        const prescription = await Prescription.findById(req.params.id)

        .populate("patient","name email phone")

        .populate("doctor","name email specialization")

        .populate("appointment")

        .populate("createdBy","name email");



        if(!prescription){

            return res.status(404).json({

                message:"Prescription not found"

            });

        }



        res.json({

            message:"Prescription fetched successfully",

            prescription

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});





// ===============================
// UPDATE PRESCRIPTION
// ===============================


router.put("/:id", authMiddleware, async(req,res)=>{


    try{


        const prescription = await Prescription.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );



        if(!prescription){

            return res.status(404).json({

                message:"Prescription not found"

            });

        }



        res.json({

            message:"Prescription updated successfully",

            prescription

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});





// ===============================
// DELETE PRESCRIPTION
// ===============================


router.delete("/:id", authMiddleware, async(req,res)=>{


    try{


        const prescription = await Prescription.findByIdAndDelete(req.params.id);



        if(!prescription){

            return res.status(404).json({

                message:"Prescription not found"

            });

        }



        res.json({

            message:"Prescription deleted successfully"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});



module.exports = router;