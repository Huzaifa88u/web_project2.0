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
  console.log(req.file.toString("base64"));
  // // const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(req.file.filename);
});

router.get("/:filename", async (req, res) => {
  // console.log("27, entered:", req.params.filename);
  const imageChunks = conn.collection("photos.chunks");
  const imageFiles = conn.collection("photos.files");
  var id = "";
  await imageFiles.findOne(
    { filename: req.params.filename },
    async (err, file) => {
      // console.log(file);
      if (file) {
        res.contentType(file.contentType);
        id = file._id;

        // console.log("42, id:", file._id);
        //making nested api calls on different collections
        await imageChunks
          .find({ files_id: file._id })
          .sort({ n: 1 })
          .toArray(function (err, chunks) {
            if (err) {
              return res.render("index", {
                title: "Download Error",
                message: "Error retrieving chunks",
                error: err.errmsg,
              });
            }
            // console.log("getting chunks");
            if (!chunks || chunks.length === 0) {
              //No data found
              console.log("chucks:", chunks);
              return res.send({
                title: "Download Error",
                message: "No data found",
              });
            }
            // console.log("merging chuncks");
            let fileData = [];
            for (let i = 0; i < chunks.length; i++) {
              //This is in Binary JSON or BSON format, which is stored
              //in fileData array in base64 endocoded string format

              fileData.push(chunks[i].data.toString("base64"));
            }
            // console.log("creating url");
            //Display the chunks using the data URI format
            let finalFile =
              "data:" + file.contentType + ";base64," + fileData.join("");
            // console.log("URL:", finalFile);
            res.send({
              title: "Image File",
              message: "Image loaded from MongoDB GridFS",
              imgurl: finalFile,
            });
          });
        // console.log("36, found");
      } else {
        // console.log("404 not found");
        res.send("404 not found");
      }
    }
  );
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
