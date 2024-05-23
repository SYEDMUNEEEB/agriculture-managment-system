const mongoose = require('mongoose');

const fieldOfficerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
  },
  area: {
    type: String,
    required: true
  }
});

const FieldOfficer = mongoose.model('FieldOfficer', fieldOfficerSchema);

module.exports = FieldOfficer;
