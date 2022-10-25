const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  birthday: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
