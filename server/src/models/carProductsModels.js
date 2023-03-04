const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const carProductsSchema = new Schema({
    idCar: {
        type: mongoose.Types.ObjectId,
        ref: 'cars',
        required: true,
    },
    idProduct: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
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

const CarProducts = mongoose.model('carProducts', carProductsSchema)

module.exports = CarProducts;