const mongoose = require("mongoose");


const medicineSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true

    },


    category: {

        type: String,

        required: true

    },


    stock: {

        type: Number,

        required: true

    },


    price: {

        type: Number,

        required: true

    },


    expiry: {

        type: String,

        required: true

    },


    status: {

        type: String,

        default: "Available"

    },


    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    }


},{

    timestamps:true

});


module.exports = mongoose.model("Medicine", medicineSchema);