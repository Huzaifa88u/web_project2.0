var express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const blog = require("../models/Blog");
const User = require("../models/User");

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
  const x = blog.find(
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

router.get("/myblogs/:id", (req, res) => {
  const x = blog.find({ userId: req.params.id },
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

router.get("/blog/:id", (req, res) => {
  const x = blog.find({_id:req.params.id},
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

router.get("/:id/:pw", (req, res) => {
  const x = User.findOne(
    { email: req.params.id, password: req.params.pw },
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
// define the about route

module.exports = router;
