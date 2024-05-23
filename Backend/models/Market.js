const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  products: [
    {
      name: {
        type: String,
        required: true
      },
      imgUrl: {
        type: String
      },
      price: {
        type: Number,
        required: true
      }

    }
  ]
});

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;
