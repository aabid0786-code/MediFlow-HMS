const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(

{

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

    appointmentDate: {

        type: Date,
        required: true

    },

    appointmentTime: {

        type: String,
        required: true

    },

    appointmentType: {

        type: String,

        enum: [

            "Consultation",
            "Follow-up",
            "Emergency",
            "Routine Checkup"

        ],

        default: "Consultation"

    },

    symptoms: {

        type: String

    },

    diagnosis: {

        type: String

    },

    notes: {

        type: String

    },

    status: {

        type: String,

        enum: [

            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"

        ],

        default: "Pending"

    },

    createdBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }

},

{

    timestamps: true

}

);

module.exports = mongoose.model("Appointment", appointmentSchema);