const mongoose = require('mongoose');

const adminContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sendTo: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const adminContact = mongoose.model('adminContact', adminContactSchema);

module.exports = adminContact;
