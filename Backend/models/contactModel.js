const mongoose = require('mongoose');

const userContactSchema = new mongoose.Schema({
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
  sendBy: {
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

const userContact = mongoose.model('userContact', userContactSchema);

module.exports = userContact;
