const mongoose = require("mongoose");


const prescriptionSchema = new mongoose.Schema({

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
        ref: "Appointment",
        required: true

    },


    diagnosis: {

        type: String,
        required: true

    },


    medicines: [

        {

            name: {

                type: String,
                required: true

            },

            dosage: {

                type: String

            },

            duration: {

                type: String

            },

            instructions: {

                type: String

            }

        }

    ],


    testsRecommended: [

        String

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
    timestamps: true
});


module.exports = mongoose.model("Prescription", prescriptionSchema);