const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dbSchema = new schema({
    fileName: {
        type: String,
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
    createdAt:{
        type: Date,
        expires: 60,
        default: Date.now
    }
});
module.exports = mongoose.model('Files', dbSchema);