const express = require("express");
const { upload } = require("../middlewares/upload.middleware");
const { uploadSongController } = require("../controllers/song.controller");

const songRouter = express.Router();

songRouter.post("/", upload.single("song"), uploadSongController);

module.exports = songRouter;
