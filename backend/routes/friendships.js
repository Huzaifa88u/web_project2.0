var express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../serverAuth.js").verifyToken;
const Friendship = require("../models/friendships");

var router = express.Router();

router.get("/getUserRequests/:id", async (req, res) => {
  const data = await verifyToken(req, res);
  console.log("data.data:", data);
  Friendship.find(
    { $and: [{ reciever: data.data }, { isFriend: 0 }] },
    function (err, reqArr) {
      res.json({ requests: reqArr });
      console.log("requests:", reqArr);
    }
  );
});

router.get("/getUserFriends/:id", async (req, res) => {
  const data = await verifyToken(req, res);
  console.log("data.data:", data);
  Friendship.find(
    {
      $and: [
        { $or: [{ reciever: data.data }, { sender: data.data }] },
        { isFriend: 1 },
      ],
    },
    function (err, reqArr) {
      res.json({ requests: reqArr });
      console.log("requests:", reqArr);
    }
  );
});

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

router.put("/acceptrequest/:id/:sender", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log("req.params.sender", req.params.sender);
  Friendship.findOneAndUpdate(
    {
      $and: [{ senderEmail: req.params.sender }, { reciever: data.data }],
    },
    req.body,
    (err, updated) => {
      if (err) {
        console.log({ message: err });
        res.send(err);
      } else {
        console.log({ message: "51:" + updated });
        res.send("updated");
      }
    }
  );
});

router.get("/checkfriend/:id/:email/:sender", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log(req.body.email);
  if (!req.params.sender) {
    Friendship.find({ recieverEmail: req.params.email }, (err, friend) => {
      if (err) {
        console.log({ message: err });
        res.send(err);
      } else {
        console.log({ message: friend });
        res.send(friend);
      }
    });
  } else {
    Friendship.find({ senderEmail: req.params.email }, (err, friend) => {
      if (err) {
        console.log({ message: err });
        res.send(err);
      } else {
        console.log({ message: friend });
        res.send(friend);
      }
    });
  }
});

router.delete("/deletefriend/:id/:reciever", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log("req.params.reciever", req.params.reciever);
  Friendship.findOneAndDelete(
    {
      $and: [{ recieverEmail: req.params.reciever }, { sender: data.data }],
    },
    (err, deleted) => {
      if (err) {
        console.log({ message: err });
        res.send(err);
      } else {
        console.log({ message: "86:" + deleted });
        res.send("deleted");
      }
    }
  );
});

router.delete("/declinerequest/:id/:sender", async (req, res) => {
  const data = await verifyToken(req, res);
  if (!data.success) return;
  console.log("req.params.sender", req.params.sender);
  Friendship.findOneAndDelete(
    {
      $and: [{ senderEmail: req.params.sender }, { reciever: data.data }],
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

router.get("/count/:id", async (req, res) => {
  const data = await verifyToken(req, res);
  console.log("data.data:", data);
  Friendship.count(
    { $and: [{ reciever: data.data }, { isFriend: 0 }] },
    function (err, count) {
      res.json({ count: count });
      console.log("Number of requests:", count);
    }
  );
});

module.exports = router;
