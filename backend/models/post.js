const mongoose = require("mongoose");

const post = mongoose.model("posts", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  content: {
    type: String,
  },
  time: {
    type: Date,
  },
  likes: {
    type: Number,
  },
  imageId: {
    type: String,
  },
});

module.exports = post;
