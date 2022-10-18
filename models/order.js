const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userID: {
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
    type: String,
    required: true,
  },
  subtotal: {
    type: String,
  },
  taxes: {
    type: String,
    required: true,
  },
  total: {
    type: String,
  },
})

module.exports = mongoose.model('Order', OrderSchema)