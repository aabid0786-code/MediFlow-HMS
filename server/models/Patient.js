const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({

    // Personal Details

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date
    },


    // Address

    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },


    // Emergency Contact

    emergencyContact: {

        name: String,
        phone: String,
        relation: String

    },


    // Medical Information

    bloodGroup: {
        type: String
    },

    allergies: [
        String
    ],

    medicalHistory: [
        String
    ],

    currentMedicines: [
        String
    ],

    previousSurgeries: [
        String
    ],


    // Insurance / ID Details

    aadhaarNumber: {
        type: String
    },

    insuranceNumber: {
        type: String
    },


    // Profile

    profileImage: {
        type: String
    },


    // Created By Admin/User

    createdBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }


},
{
    timestamps: true
});


module.exports = mongoose.model("Patient", patientSchema);