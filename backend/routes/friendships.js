var express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../serverAuth.js").verifyToken;
const Friendship = require("../models/friendships");

var router = express.Router();

router.post("/sendrequest/:id", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log("friendship verified user");
  const friendship = new Friendship(req.body);
  console.log(friendship);
  friendship.save((err) => {
    if (err) {
      console.log({ message: err });
      res.send(err);
    } else {
      console.log({ message: "Success" });
      res.send("success");
    }
  });
});

router.get("/checkfriend/:id/:email", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log(req.body.email);
  Friendship.find({ recieverEmail: req.params.email }, (err, friend) => {
    if (err) {
      console.log({ message: err });
      res.send(err);
    } else {
      console.log({ message: friend });
      res.send(friend);
    }
  });
});

router.delete("/deletefriend/:id/:reciever", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log("req.params.reciever", req.params.reciever);
  Friendship.findOneAndDelete(
    {
      $and: [{ recieverEmail: req.params.reciever }, { senderId: data.data }],
    },
    (err, deleted) => {
      if (err) {
        console.log({ message: err });
        res.send(err);
      } else {
        console.log({ message: "52:" + deleted });
        res.send("deleted");
      }
    }
  );
});

module.exports = router;
