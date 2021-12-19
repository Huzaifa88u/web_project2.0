var express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const blog = require("../models/Blog");
const User = require("../models/User");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
var router = express.Router();

router.post("/createblog", (req, res) => {
  console.log("decrypted", req.body.userId);

  const decrypted = cryptr.decrypt(req.body.userId);
  const b = new blog({
    userId: decrypted,
    Title: req.body.Title,
    content: req.body.content,
    time: req.body.time,
  });
  console.log("decrypted", decrypted);
  b.save((err) => {
    if (err) {
      console.log({ message: err });
      res.send(err);
    } else {
      console.log({ message: "Success" });
      res.send("success");
    }
  });
});

router.get("/getblogs/:limit/:page", (req, res) => {
  // const x = blog.find(
  //   { skip: req.params.limit * req.params.page, limit: req.params.limit },
  //   (err, testData) => {
  //     if (err) {
  //       res.send(err);
  //       console.log(err);
  //     } else {
  //       res.send(testData);
  //     }
  //   }
  // );
  var query = blog
    .find()
    .skip(req.params.limit * req.params.page)
    .limit(req.params.limit);

  query.exec(function (err, doc) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(doc);
  });
});

router.get("/blogcount", (req, res) => {
  blog.count({}, function (err, count) {
    res.json({ count: count });
    console.log("Number of blogs:", count);
  });
});

router.get("/getblogs", (req, res) => {
  const x = blog.find((err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(testData);
    }
  });
});

router.get("/myblogs/:id", (req, res) => {
  const decrypted = cryptr.decrypt(req.params.id);
  const x = blog.find({ userId: decrypted }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(testData);
      res.send(testData);
    }
  });
});

router.get("/blog/:id", (req, res) => {
  const x = blog.find({ _id: req.params.id }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(testData);
    }
  });
});

router.put("/editBlog/:id", (req, res) => {
  const x = blog.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, testData) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(testData);
      }
    }
  );
});

router.delete("/deleteblog/:id", (req, res) => {
  const x = blog.deleteOne({ _id: req.params.id }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(testData);
      res.send(testData);
    }
  });
});

module.exports = router;
