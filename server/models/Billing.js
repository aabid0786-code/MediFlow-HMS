const mongoose = require("mongoose");


const billingSchema = new mongoose.Schema({

    patient: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true

    },


    appointment: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"

    },


    doctor: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"

    },


    invoiceNumber: {

        type: String,
        unique: true,
        required: true

    },


    consultationCharge: {

        type: Number,
        default: 0

    },


    medicineCharge: {

        type: Number,
        default: 0

    },


    labCharge: {

        type: Number,
        default: 0

    },


    otherCharges: {

        type: Number,
        default: 0

    },


    totalAmount: {

        type: Number,
        default: 0

    },


    paymentMethod: {

        type: String,

        enum: [
            "Cash",
            "Card",
            "UPI",
            "Insurance"
        ],

        default: "Cash"

    },


    paymentStatus: {

        type: String,

        enum: [
            "Pending",
            "Paid",
            "Partial"
        ],

        default: "Pending"

    },


    transactionId: {

        type: String

    },


    notes: {

        type: String

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




// Auto calculate total amount

billingSchema.pre("save", function(){

    this.totalAmount =
        this.consultationCharge +
        this.medicineCharge +
        this.labCharge +
        this.otherCharges;

});



module.exports = mongoose.model(
    "Billing",
    billingSchema
);