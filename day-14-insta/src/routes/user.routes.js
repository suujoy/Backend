const express= require('express')
const identifyUser = require('../middlewares/auth.middleware')
const { followUserController, unfollowUserController } = require('../controllers/user.controller')
const userRouter = express.Router()

/**
 * @route POST /api/user/follow/:username
 * @description Follows a user by username
 */

userRouter.post('/follow/:username',identifyUser,followUserController)

/**
 * @route POST /api/user/unfollow/:username
 * @description Unfollows a user by username
 */

userRouter.post('/unfollow/:username',identifyUser,unfollowUserController)

module.exports=userRouter