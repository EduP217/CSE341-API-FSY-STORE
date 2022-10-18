const mongoose = require('mongoose')

const Shipping_typeSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Shipping_types', Shipping_typeSchema)