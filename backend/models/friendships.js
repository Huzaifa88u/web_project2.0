const mongoose = require("mongoose");

const Friendship = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isFriend: {
    type: Number,
  },
});

module.exports = mongoose.model("Friendships", Friendship);
