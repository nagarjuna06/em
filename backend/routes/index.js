import { Router } from "express";
import authRouter from "./auth.js";
import employeeRouter from "./employee.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/employee", employeeRouter);

export default router;
