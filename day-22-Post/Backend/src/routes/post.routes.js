const express = require("express");
const {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController,
} = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

/**
 * POST /api/post/
 */

postRouter.post(
    "/",
    upload.single("image"),
    identifyUser,
    createPostController,
);

/**
 * GET /api/post/
 */

postRouter.get("/", identifyUser, getPostController);

/**
 * @Route GET /api/post/feed
 * @des Get all The post created in the db
 * @access private
 */

postRouter.get("/feed", identifyUser, getFeedController);

/**
 * GET /api/post/details/:postId
 */

postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

/**
 * @Route POST /api/post/like/postId
 */

postRouter.post("/like/:postId", identifyUser, likePostController);

/**
 * @Route POST /api/post/unlike/postId
 */
postRouter.post("/unlike/:postId", identifyUser, unLikePostController);

module.exports = postRouter;
