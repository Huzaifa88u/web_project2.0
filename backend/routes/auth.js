var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
var ls = require("local-storage");
const verifyToken = require("../serverAuth.js").verifyToken;
const signToken = require("../serverAuth.js").signToken;
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

const mailjet = require("node-mailjet").connect(
  "807749bbbe142782f3450e574778d325",
  "f9001c4a61ed394892e767133474781e"
);

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

router.put("/changepassword/:email", (req, res) => {
  console.log("req.param.email:", req.params.email);
  console.log("req.body:", req.body);
  User.findOneAndUpdate({ email: req.params.email }, req.body, (err, user) => {
    if (err) {
      res.statusCode(err.statusCode).send(err);
      console.log(err);
    } else {
      res.send(user);
    }
  });
});

router.get("/forgetpassword/:email", (req, res) => {
  console.log("82");
  const OTP = cryptr.encrypt(req.params.email).slice(0, 7).toUpperCase();
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "haadbaig@gmail.com",
          Name: "Social Circle",
        },
        To: [
          {
            Email: req.params.email,
            name: "",
          },
        ],
        Subject: "Greetings from Team of Social Circles.",
        TextPart: "My first Mailjet email",
        HTMLPart: `<h3>Dear ${req.params.email}, <p>A request was made for changing password, here is you OTP code <strong>${OTP}</strong></p>`,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .catch((err) => {
      console.log(err.statusCode);
      res.status(err.statusCode).send(err);
    })
    .then((result) => {
      console.log("result.body", result?.body);
      res.send(OTP);
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
