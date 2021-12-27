const mongoose = require("mongoose");

const post = mongoose.model("posts", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = post;
