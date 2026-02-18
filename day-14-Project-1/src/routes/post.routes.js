const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

/**
 * POST /api/post
 * -req.body ={ caption , imagefile}
 */

postRouter.post("/",upload.single('image'), postController.createPostController);

module.exports = postRouter;
