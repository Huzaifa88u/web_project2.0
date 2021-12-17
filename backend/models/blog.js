const mongoose = require("mongoose");

const Blogg = mongoose.model("bloggs", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Title: {
    type: String,
  },
  content: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = Blogg;