const { string } = require('@hapi/joi')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
  },
  productImage: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
})

module.exports = mongoose.model('Products', ProductSchema)