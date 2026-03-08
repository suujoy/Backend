import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, registerController);

export default authRouter;
