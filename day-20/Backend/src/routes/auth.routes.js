const express = require("express");
const {
    registerController,
    loginController,
    getMeController,
} = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");
const authRouter = express.Router();

/**
 * POST /api/auth/register
 */

authRouter.post("/register", registerController);

/**
 * POST /api/auth/login
 */

authRouter.post("/login", loginController);

/**
 * @route GET /api/auth/get-me
 * @desc get the currently logged in user's information
 * @access private
 */

authRouter.get("/get-me", identifyUser, getMeController);

module.exports = authRouter;
