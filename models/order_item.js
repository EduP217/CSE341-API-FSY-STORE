const mongoose = require('mongoose')

const Order_itemSchema = new mongoose.Schema({
    orderID: {
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
  offeraDiscount: {
    type: String,
  },
  shippingCost: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Order_item', Order_itemSchema)