import express from "express";
import validate from "../middleware/validate.js";
import { loginSchema } from "../utils/validations.js";
import { loginController, sessionController } from "../controllers/auth.js";
import jwtMiddleware from "../middleware/jwt.js";

const authRouter = express.Router();

// authRouter.post("/register", validate(loginSchema), registerController);

authRouter.post("/login", validate(loginSchema), loginController);

authRouter.get("/session", jwtMiddleware, sessionController);

export default authRouter;
