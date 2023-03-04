const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const carSchema = new Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    quantity : {
        type: Number,
    },
    priceTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'active'
    }

});

const Car = mongoose.model('cars', carSchema)

module.exports = Car;