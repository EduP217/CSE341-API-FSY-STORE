const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastDateModified: {
    type: Date,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  taxes: {
    type: String,
  },
  total: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Cart', CartSchema)