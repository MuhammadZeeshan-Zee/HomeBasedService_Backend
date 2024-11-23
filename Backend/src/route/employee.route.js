import { Router } from "express";
import {
  addEmployee,
  readallEmployee,
  updateEmployee,
  deleteEmployee,
  employeeCount,
} from "../controller/employee.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { AdminVerify } from "../middleware/adminVerify.middleware.js";

const router = Router();
router.route("/addEmployee").post(verifyJWT, addEmployee);
router.route("/readallEmployee").get(verifyJWT, readallEmployee);
router.route("/updateEmployee/:id").put(verifyJWT, updateEmployee);
router.route("/deleteEmployee/:id").delete(verifyJWT, deleteEmployee);
router.route("/employeeCount").get(verifyJWT, employeeCount);

export default router;
