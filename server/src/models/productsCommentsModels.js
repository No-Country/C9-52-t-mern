const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const productsCommentsSchema = new Schema({
    idComments: {
        type: mongoose.Types.ObjectId,
        ref: 'comments',
        required: true
    },
    idProducts: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    }

});

const ProductsComments = mongoose.model('ProductsComments', productsCommentsSchema)

module.exports = ProductsComments;