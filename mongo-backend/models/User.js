// /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  password: String,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
