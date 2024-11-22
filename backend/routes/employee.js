import { Router } from "express";
import jwtMiddleware from "../middleware/jwt.js";
import {
  createEmployeeController,
  deleteEmployeeController,
  getEmployeesController,
  updateEmployeesController,
  uploadEmployeeImageController,
} from "../controllers/employee.js";
import upload from "../middleware/multer.js";
import validate from "../middleware/validate.js";
import { employeeSchema } from "../utils/validations.js";

const employeeRouter = Router();

employeeRouter.use(jwtMiddleware);

employeeRouter.post("", validate(employeeSchema), createEmployeeController);

employeeRouter.get("/all", getEmployeesController);

employeeRouter.put(
  "/upload",
  upload.single("image"),
  uploadEmployeeImageController
);

employeeRouter.put("/:id", validate(employeeSchema), updateEmployeesController);

employeeRouter.delete("/:id", deleteEmployeeController);

export default employeeRouter;
