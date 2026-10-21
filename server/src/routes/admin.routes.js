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

import { body } from "express-validator";
import validate from "../middlewares/validate.js";

const router = Router();
router.use(protect, restrictTo("admin"));

const whatsappValidation = [
  body("whatsapp")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^(010|011|012|015)\d{8}$/)
    .withMessage("رقم الواتساب يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)"),
];

router.get("/users",                 getUsers);
router.patch("/users/:id/role",      updateUserRole);
router.patch("/users/:id/whatsapp",  whatsappValidation, validate, updateUserWhatsapp);
router.delete("/users/:id",          deactivateUser);

// Employee Rotation
router.get("/employees/rotation",             getEmployeesRotation);
router.patch("/employees/:id/rotation",       updateEmployeeRotation);
router.post("/employees/rotation/reorder",     reorderEmployeesRotation);

export default router;
