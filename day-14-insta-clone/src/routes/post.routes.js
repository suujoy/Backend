const express = require("express");
const {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
} = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

/**
 * @route POST /api/post/
 * @description Creates a post using data from req.body
 */

postRouter.post(
    "/",
    upload.single("image"),
    identifyUser,
    createPostController,
);

/**
 * @route GET /api/post/
 * @description Get all posts from the database
 */

postRouter.get("/", identifyUser, getPostController);

/**
 *@route  GET /api/post/:postId
 * @description Get a single post by its id
 */

postRouter.get("/:postId", identifyUser, getPostDetailsController);

/**
 * @route POST /api/post/like/:postId
 * @description Like a post with the id porvided in the requist params
 */

postRouter.post('/like/:postId',identifyUser,likePostController)

module.exports = postRouter;
