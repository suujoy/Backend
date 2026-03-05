const express = require("express");
const { upload } = require("../middlewares/upload.middleware");
const {
    uploadSongController,
    getSongController,
} = require("../controllers/song.controller");

const songRouter = express.Router();

songRouter.post("/", upload.single("song"), uploadSongController);

songRouter.get("/", getSongController);

module.exports = songRouter;
