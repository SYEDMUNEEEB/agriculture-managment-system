

const mongoose = require('mongoose');

// Define farm schema
const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Farm model from schema
const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
