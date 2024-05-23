const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
    }
});

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
