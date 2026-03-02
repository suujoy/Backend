const express = require("express");
const {
    registerUserController,
    loginUserController,
} = require("../controllers/auth.controller");
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

module.exports = authRouter;
