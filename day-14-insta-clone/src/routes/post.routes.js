const express = require("express");
const { createPostController, getPostController, getPostDetails } = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = express.Router();
const identifyUser = require('../middlewares/auth.middleware')


/**
 * POST /api/post
 */
postRouter.post("/",upload.single('image'), identifyUser,createPostController);


/**
 * GET /api/post
 */
postRouter.get('/',identifyUser ,getPostController)


/**
 * GET /api/post/details/:postId
 * -return an detail about specific post with the id also check wheather the post belongs to the user that is recuest came from
 */

postRouter.get('/details/:postId',identifyUser,getPostDetails)


module.exports = postRouter;
