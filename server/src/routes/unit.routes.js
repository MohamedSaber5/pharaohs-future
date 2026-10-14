import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { getAllUnits, getUnit, createUnit, updateUnit, deleteUnit } from "../controllers/unit.controller.js";

const router = Router();

router.get("/",      getAllUnits);
router.get("/:id",   getUnit);
router.post("/",     protect, restrictTo("admin"), createUnit);
router.patch("/:id", protect, restrictTo("admin"), updateUnit);
router.delete("/:id",protect, restrictTo("admin"), deleteUnit);

export default router;
