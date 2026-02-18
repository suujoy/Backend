const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

/**
 *  POST   /api/auth/register
 */
authRouter.post("/register", authController.registerControllar);

/**
 * POST /api/login
 */

authRouter.post("/login", authController.logginController);

module.exports = authRouter;
