const mongoose  = require("mongoose");
const { Schema } = require('mongoose');


const commentsSchema = new Schema({
    coments: {
        type: 'string',
        required: true,
    },
    status: {
        type: 'string',
        default: 'active'
    },
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

const Comments = mongoose.model('comments', commentsSchema)

module.exports = Comments;