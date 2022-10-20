const mongoose = require('mongoose')

const Cart_itemSchema = new mongoose.Schema({
    cartId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerDiscount: {
    type: Number,
  },
})

module.exports = mongoose.model('Cart_item', Cart_itemSchema)