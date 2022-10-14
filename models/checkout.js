const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    orderID: {
    type: String,
    required: true,
  },
  paymentID: {
    type: String,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Payment', PaymentSchema)