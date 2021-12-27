const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

const conn = mongoose.connection;

let gfs;

conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  console.log("file is not undefined");
  // const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(req.file.filename);
});

router.get("/:filename", async (req, res) => {
  console.log("entered:", req.params.filename);
  await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    console.log(file);
    if (file) {
      res.contentType(file.contentType);
      // Read output to browser
      console.log("found");
      console.log(file);
      // res.contentType(file.contentType);
      // res.send(file);
    } else {
      console.log("404 not found");
      res.send("404 not found");
    }
  });
});

router.delete("/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

module.exports = router;
