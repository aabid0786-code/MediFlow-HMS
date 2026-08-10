const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema({


    patient: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true

    },


    doctor: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true

    },


    appointment: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"

    },


    prescription: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription"

    },


    symptoms: {

        type: String

    },


    diagnosis: {

        type: String,
        required: true

    },


    treatment: {

        type: String

    },


    vitalSigns: {


        bloodPressure: {

            type: String

        },


        temperature: {

            type: String

        },


        weight: {

            type: String

        },


        heartRate: {

            type: String

        }


    },


    labReports: [


        {

            testName: {

                type: String

            },


            result: {

                type: String

            },


            reportDate: {

                type: Date

            }


        }


    ],



    doctorNotes: {

        type: String

    },


    followUpDate: {

        type: Date

    },



    createdBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }


},
{
    timestamps:true
});



module.exports = mongoose.model(
    "MedicalRecord",
    medicalRecordSchema
);