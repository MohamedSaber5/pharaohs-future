import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  updateUserRole,
  updateUserWhatsapp,
  deactivateUser,
  getEmployeesRotation,
  updateEmployeeRotation,
  reorderEmployeesRotation,
} from "../controllers/admin.controller.js";

const router = Router();
router.use(protect, restrictTo("admin"));

router.get("/users",                 getUsers);
router.patch("/users/:id/role",      updateUserRole);
router.patch("/users/:id/whatsapp",  updateUserWhatsapp);
router.delete("/users/:id",          deactivateUser);

// Employee Rotation
router.get("/employees/rotation",             getEmployeesRotation);
router.patch("/employees/:id/rotation",       updateEmployeeRotation);
router.post("/employees/rotation/reorder",     reorderEmployeesRotation);

export default router;
