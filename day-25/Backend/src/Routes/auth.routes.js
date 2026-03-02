const express = require("express");
const { registerUserController } = require("../controllers/auth.controller");
const authRouter = express.Router();

/**
 * @router POST /api/auth/register
 */

authRouter.post("/register", registerUserController);

module.exports = authRouter;
