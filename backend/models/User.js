const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  phonenumber: {
    type: String,
  },

  profilePicId: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);
