var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
var ls = require("local-storage");

var router = express.Router();

router.post("/createuser", (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      console.log({ message: err });
      res.send(err);
    } else {
      console.log({ message: "Success" });
      res.send("success");
    }
  });
});

router.get("/:id/:pw", (req, res) => {
  console.log(req.params.id);
  console.log(req.params.pw);
  const x = User.findOne(
    { email: req.params.id, password: req.params.pw },
    (err, testData) => {
      if (err) {
        res.send(null);
        console.log(err);
      } else {
        console.log(testData?._id.toString());
        const encrypted = cryptr.encrypt(testData?._id.toString());
        res.send(encrypted.toString());
      }
    }
  );
});
// define the about route

module.exports = router;
