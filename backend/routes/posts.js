var express = require("express");
const post = require("../models/post");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
var router = express.Router();

router.post("/createpost", (req, res) => {
  console.log("decrypted", req.body.userId);

  const decrypted = cryptr.decrypt(req.body.userId);
  const b = new post({
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

router.get("/getposta/:limit/:page", (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page, 10) || 0,
    limit: parseInt(req.params.limit, 10) || 10,
  };

  var query = post
    .find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  query.exec(function (err, doc) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(doc);
  });
});

router.get("/postcount", (req, res) => {
  post.count({}, function (err, count) {
    res.json({ count: count });
    console.log("Number of posts:", count);
  });
});

router.get("/getposts", (req, res) => {
  const x = post.find((err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(testData);
    }
  });
});

router.get("/myposts/:id", (req, res) => {
  const decrypted = cryptr.decrypt(req.params.id);
  const x = post.find({ userId: decrypted }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log(testData);
      res.send(testData);
    }
  });
});

router.get("/post/:id", (req, res) => {
  const x = post.find({ _id: req.params.id }, (err, testData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(testData);
    }
  });
});

router.put("/editPost/:id", (req, res) => {
  const x = post.findOneAndUpdate(
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

router.delete("/deletepost/:id", (req, res) => {
  const x = post.deleteOne({ _id: req.params.id }, (err, testData) => {
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
