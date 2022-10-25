const mongoose = require('mongoose')

const ShippingSchema = new mongoose.Schema({
  orderItemId: {
    type: String,
    required: true,
  },
  shippingTypeId: {
    type: String,
    required: true,
  },
  shippingDate: {
    type: Date,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Shipping', ShippingSchema)