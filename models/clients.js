const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  eMail: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
  },
})

module.exports = mongoose.model('Clients', ClientSchema)