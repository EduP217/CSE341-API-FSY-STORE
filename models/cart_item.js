const mongoose = require('mongoose')

const Cart_itemSchema = new mongoose.Schema({
    cartID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  offerDiscount: {
    type: String,
  },
})

module.exports = mongoose.model('Cart_item', Cart_itemSchema)