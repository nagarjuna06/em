import express from "express";
import validate from "../middleware/validate.js";
import { loginSchema } from "../utils/validations.js";
import { loginController, registerController } from "../controllers/auth.js";

const authRouter = express.Router();

// authRouter.post("/register", validate(loginSchema), registerController);

authRouter.post("/login", validate(loginSchema), loginController);

export default authRouter;
