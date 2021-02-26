const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dbSchema = new schema({
    fileName: {
        type: String,
        required: true
    },
    
    val:{
        type: Number,
        default: 10,
        required: true
    },

    path:{
        type: String,
        required: true
    },

    size:{
        type: Number,
        required: true
    },

    uuid:{
        type: String,
        required: true
    },

},{timestamps: true});
module.exports = mongoose.model('Files', dbSchema);