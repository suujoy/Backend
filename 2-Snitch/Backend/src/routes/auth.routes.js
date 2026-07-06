import { Router } from "express";
import { validateLogin, validateRegister } from "../validations/auth.validation.js";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = Router();

// API 

/**
 * @name Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

authRouter.post("/register", validateRegister, register);

authRouter.post('/login',validateLogin,login)

export default authRouter;
