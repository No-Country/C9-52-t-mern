const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const productsSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    model: {
        type: 'string',
        required: true
    },
    brand: {
        type: 'string',
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    description: {
        type: "string",
        required: true
    },
    characteristics: {
        type: [String],
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    status: {
        type: 'string',
        default: 'active'
    },
    promocion: {
        type: Boolean,
        default: false
    },
    destacados: {
        type: Number,
        default: 0
    },
    blackFriday: {
        type: Boolean,
        default: false
    },
    descuento: {
        type: Number,
        default: 0
    },
    idSeller: {
      type: Schema.Types.ObjectId,
      ref: 'sellers'
    }
})

const Products = mongoose.model('products', productsSchema)

module.exports = Products;