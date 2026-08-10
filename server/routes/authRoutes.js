const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();



// REGISTER

router.post("/register", async(req,res)=>{

try{


const {
name,
email,
mobile,
password,
role
}=req.body;



const exist = await User.findOne({
$or:[
{email},
{mobile}
]
});


if(exist){

return res.status(400).json({
message:"User already exists"
});

}



const hash = await bcrypt.hash(password,10);



const user = await User.create({

name,
email,
mobile,
password:hash,
role

});



res.json({

message:"Register successful"

});



}catch(error){

res.status(500).json({
message:error.message
});

}

});







// LOGIN EMAIL OR MOBILE


router.post("/login",async(req,res)=>{


try{


const {
login,
password
}=req.body;




const user = await User.findOne({

$or:[

{
email:login
},

{
mobile:login
}

]

});




if(!user){

return res.status(404).json({

message:"User not found"

});

}




const match = await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({

message:"Wrong password"

});

}





const token = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);





res.json({

message:"Login successful",

token,

user:{

id:user._id,
name:user.name,
email:user.email,
mobile:user.mobile,
role:user.role

}


});





}catch(error){

res.status(500).json({

message:error.message

});

}


});





module.exports=router;