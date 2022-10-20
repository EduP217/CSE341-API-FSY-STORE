const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
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
  shippingCost: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
  },
  taxes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
})

module.exports = mongoose.model('Order', OrderSchema)