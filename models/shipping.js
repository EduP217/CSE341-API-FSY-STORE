const mongoose = require('mongoose')

const ShippingSchema = new mongoose.Schema({
  orderItemID: {
    type: String,
    required: true,
  },
  shippingTypeID: {
    type: String,
    required: true,
  },
  shippingDate: {
    type: Date,
    required: true,
  },
  shippingCost: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Shipping', ShippingSchema)