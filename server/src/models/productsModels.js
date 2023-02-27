const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    description: {
        type: String,
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
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'active'
    },
    promotion: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Number,
        default: 0
    },
    blackFriday: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    idSeller: {
      type: mongoose.Types.ObjectId,
      ref: 'sellers',
      required: true,
    }
})

const Products = mongoose.model('products', productsSchema)

module.exports = Products;