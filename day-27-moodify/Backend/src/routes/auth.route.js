const express = require("express");
const {
    registerController,
    loginController,
    getMeController,
    logoutController,
} = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middlewares");

const authRouter = express.Router();

/**
 * @name Register User
 * @Route POST /api/auth/register
 * @description This will create a new user in the database
 */
authRouter.post("/register", registerController);

/**
 * @name Loging User
 * @Route POST /api/auth/login
 * @description This will login a user using creadentials
 */

authRouter.post("/login", loginController);

/**
 * @name Fetch User
 * @Route GET /api/auth/get-me
 * @description This will help to Fetch the user from the database
 */

authRouter.get("/get-me", identifyUser, getMeController);

/**
 * @name Logout User
 * @Route GET /api/auth/logout
 * @description This will BlackList the token and clear the token from the browser and logout the user from the site
 */
authRouter.get("/logout", identifyUser, logoutController);

module.exports = authRouter;
