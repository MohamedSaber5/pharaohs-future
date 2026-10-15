import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { getUsers, updateUserRole, updateUserWhatsapp, deactivateUser } from "../controllers/admin.controller.js";

const router = Router();
router.use(protect, restrictTo("admin"));

router.get("/users",              getUsers);
router.patch("/users/:id/role",   updateUserRole);
router.patch("/users/:id/whatsapp", updateUserWhatsapp);
router.delete("/users/:id",       deactivateUser);

export default router;
