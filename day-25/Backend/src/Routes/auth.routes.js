const express = require("express");

const {
    registerUserController,
    loginUserController,
    getMeController,
    logoutController,
} = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/auth.middleware");
const authRouter = express.Router();

/**
 * @router POST /api/auth/register
 * @Desc This will use for Register a new user
 */

authRouter.post("/register", registerUserController);

/**
 * @Route POST /api/auth/login
 * @Desc This Will use for Login user
 */

authRouter.post("/login", loginUserController);

/**
 * @Route Get-me
 */

authRouter.get("/get-me", identifyUser, getMeController);

/**
 * @Route Post /api/auth/logout
 */

authRouter.get("/logout", logoutController);

module.exports = authRouter;
