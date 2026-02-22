const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const { followUserController } = require('../controllers/user.controller')

const userRouter = express.Router()


/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
 * @access Private
 */


userRouter.post('/follow/:username',identifyUser,followUserController)






module.exports=userRouter