const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  OAuthProfileId: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  photoImage: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true,
  },
  roleID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
