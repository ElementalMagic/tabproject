const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const link = new Schema({
    title:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('link', link);
