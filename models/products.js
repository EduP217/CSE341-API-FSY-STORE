const number = require('@hapi/joi/lib/types/number')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
    type: number,
  },
  productImage: {
    type: Image,
    required: true,
  },
  thumbnail: {
    type: Image,
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