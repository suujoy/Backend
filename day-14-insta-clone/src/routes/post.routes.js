const express = require("express");
const { createPostController } = require("../controller/post.controller");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/post [protected]
 * -req.body : { caption , image-file}
 */

postRouter.post("/",upload.single('image'), createPostController);

module.exports = postRouter;
