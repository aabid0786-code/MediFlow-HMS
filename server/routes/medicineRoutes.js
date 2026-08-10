const express = require("express");

const Medicine = require("../models/Medicine");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();




// ADD MEDICINE

router.post("/", authMiddleware, async(req,res)=>{


try{


const medicine = await Medicine.create({

...req.body,

createdBy:req.user.id


});


res.status(201).json({

message:"Medicine added successfully",

medicine

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});







// GET ALL MEDICINES


router.get("/", authMiddleware, async(req,res)=>{


try{


const medicines = await Medicine.find();


res.json({

message:"Medicines fetched successfully",

medicines

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});







// UPDATE MEDICINE


router.put("/:id", authMiddleware, async(req,res)=>{


try{


const medicine = await Medicine.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);



res.json({

message:"Medicine updated successfully",

medicine

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});







// DELETE MEDICINE


router.delete("/:id", authMiddleware, async(req,res)=>{


try{


await Medicine.findByIdAndDelete(req.params.id);


res.json({

message:"Medicine deleted successfully"

});


}catch(error){


res.status(500).json({

message:error.message

});


}


});





module.exports = router;