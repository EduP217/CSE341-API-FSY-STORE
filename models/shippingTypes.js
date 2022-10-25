const mongoose = require('mongoose')

const ShippingTypeSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('shippingTypes', ShippingTypeSchema)