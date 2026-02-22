const express = require('express')
const { createPostController, getPostController, getPostDetailsController } = require('../controllers/post.controller')
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });



const postRouter = express.Router()

/**
 * POST /api/post/
 */

postRouter.post('/',upload.single('image'),createPostController)

/**
 * GET /api/post/
 */

postRouter.get('/',getPostController)

/**
 * GET /api/post/:postId
 */

postRouter.get('/:postId',getPostDetailsController)


module.exports= postRouter