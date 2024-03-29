const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var auth = require("./routes/auth");
var posts = require("./routes/posts");
var upload = require("./routes/upload");
var friendships = require("./routes/friendships");
const Grid = require("gridfs-stream");
const port = 3000;
const app = express();
const url = "mongodb://localhost:27017/people_connect";

app.use(cors({ origin: "http://localhost:3001" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// issue resolved because of not proper
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let gfs;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("check server connection");
});

app.use("/auth", auth);
app.use("/posts", posts);
app.use("/friendships", friendships);
app.use("/file", upload);

app.listen(port, () => {
  console.log("Connected");
});
