const mongoose  = require("mongoose");
const { Schema } = require('mongoose');

const homeSchema = new Schema({
    ciudad:{
        type: 'string',
        required: true
    },
    estado: {
        type: 'string',
        required: true
    },
    calle: {
        type: 'string',
        required: true
    },
    numero: {
        type: 'string',
        required: true
    },
    codigoPostal: {
        type: Number,
        required: true
    },
    referencia: {
        type: 'string',
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: 'string',
        default: 'active'
    }
});

const Home = mongoose.model('home', homeSchema)

module.exports = Home;