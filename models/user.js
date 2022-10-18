const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    OAuthProfile: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPhotoImage: {
    type: Image,
    required: true,
  },
  userAccessToken: {
    type: String,
    required: true,
  },
  secretToken: {
    type: String,
  },
  roleID: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)