const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Payment', PaymentSchema)