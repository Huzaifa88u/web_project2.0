var express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const blog = require("../models/Blog");
const User = require("../models/User");

var router = express.Router();

router.post("/createblog", (req, res) => {
  const b = new blog(req.body);
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
  const x = blog.find({ userId: req.params.id }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
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
