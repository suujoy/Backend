const express = require("express");
const { upload } = require("../middlewares/profileImage.middleware");
const {
    registerController,
    loginController,
    getMeController,
    logoutController,
} = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @name : Register
 * @route :  /api/auth/register
 * @method : POST
 * @access : Public
 * @description : Register a user
 */

authRouter.post("/register", upload.single("profileImage"), registerController);

/**
 * @name : Login
 * @route :  /api/auth/login
 * @method : POST
 * @access : Public
 * @description : Logged in  a user
 */

authRouter.post("/login", loginController);

/**
 * @name : GetMe
 * @route :  /api/auth/get-me
 * @method : GET
 * @access : Public
 * @description : Fetch   a user
 */

authRouter.get("/get-me", identifyUser, getMeController);

/**
 * @name : Log Our
 * @route :  /api/auth/logout
 * @method : GEt
 * @access : Public
 * @description : Log  out   a user
 */

authRouter.get("/logout", identifyUser, logoutController);

module.exports = authRouter;
