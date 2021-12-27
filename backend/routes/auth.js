var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
var ls = require("local-storage");
const verifyToken = require("../serverAuth.js").verifyToken;
const signToken = require("../serverAuth.js").signToken;

var router = express.Router();

router.post("/createuser", (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      console.log({ message: err });
      res.send(err);
    } else {
      const token = signToken(user);
      console.log({ message: "Success" });
      res.json({
        success: true,
        message: "User created. Token attached.",
        token,
      });
    }
  });
});

router.put("/edituser/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: verifyToken(req, res) },
    req.body,
    (err, testData) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log("37:", testData);
        const token = signToken(testData);
        res.send({ token, testData });
      }
    }
  );
});

router.get("/getuser/:id", async (req, res) => {
  const data = await verifyToken(req, res);
  // console.log("data:", data);
  User.findById({ _id: data }, (err, user) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(user);
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
        const token = signToken(testData);
        console.log("token:", token);
        res.send(token);
      }
    }
  );
});
// define the about route

module.exports = router;
