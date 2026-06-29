import { Router } from "express";
import { validateRegister } from "../validations/auth.validation.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

// API

/**
 * @Route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register", validateRegister, register);

export default authRouter;
