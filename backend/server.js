const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var auth = require("./routes/auth");
var blogs = require("./routes/blog");
const port = 3000;
const app = express();
const url = "mongodb://localhost:27017/blogs";

app.use(cors({ origin: "http://localhost:3001" }));
app.use(bodyParser.urlencoded({ extended: true }));

// issue resolved because of not proper connection
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("check server connection");
});

app.use("/auth", auth);
app.use("/blogs", blogs);

app.listen(port, () => {
  console.log("Connected");
});
