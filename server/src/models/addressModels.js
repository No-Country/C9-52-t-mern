const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const addressSchema = new Schema({
    title: {
        type: String,
    },
    city:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: 'active'
    }
});

const address = mongoose.model('address', addressSchema)

module.exports = address;