const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
    followUserController,
    unfollowUserController,
    followAcceptController,
    followRejectController,
} = require("../controllers/user.controller");
const userRouter = express.Router();

/**
 * @route POST /api/user/follow/:username
 * @description Follows a user by username
 */

userRouter.post("/follow/:username", identifyUser, followUserController);

/**
 * @route POST /api/user/unfollow/:username
 * @description Unfollows a user by username
 */

userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

/**
 * @Name Status Accept
 * @Route /api/follow/accept/:username
 * @description This will accept the request and update the status
 */

userRouter.post("/accept/:username", identifyUser, followAcceptController);

/**
 * @Name Status Accept
 * @Route /api/follow/reject/:username
 * @description This will Reject the request and update the status
 */

userRouter.post("/reject/:username", identifyUser, followRejectController);

module.exports = userRouter;
