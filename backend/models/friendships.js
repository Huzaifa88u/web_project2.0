const mongoose = require("mongoose");

const Friendship = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  senderEmail: {
    type: String,
  },

  senderName: {
    type: String,
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  recieverEmail: {
    type: String,
  },

  recieverName: {
    type: String,
  },

  isFriend: {
    type: Number,
  },
});

module.exports = mongoose.model("Friendship", Friendship);
