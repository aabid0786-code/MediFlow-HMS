const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


// Routes
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const billingRoutes = require("./routes/billingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const medicineRoutes = require("./routes/medicineRoutes");


// Middleware
const authMiddleware = require("./middleware/authMiddleware");


const app = express();


// Middlewares
app.use(cors());
app.use(express.json());



// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/medical-records", medicalRecordRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/medicines", medicineRoutes);




// MongoDB Connection

mongoose
.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log("MongoDB Error:", error.message);

});





// Home Route

app.get("/",(req,res)=>{

    res.send("MediFlow Backend Running");

});





// Protected Test Route

app.get("/api/profile",authMiddleware,(req,res)=>{


    res.json({

        message:"Protected route accessed",

        user:req.user

    });


});





// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});