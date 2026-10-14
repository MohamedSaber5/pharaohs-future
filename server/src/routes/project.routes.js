import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  getAllProjects, getProject, createProject,
  updateProject, deleteProject, getProjectStats
} from "../controllers/project.controller.js";

const router = Router();

router.get("/stats", protect, restrictTo("admin"), getProjectStats);
router.get("/",      getAllProjects);
router.get("/:id",   getProject);
router.post("/",     protect, restrictTo("admin"), createProject);
router.patch("/:id", protect, restrictTo("admin"), updateProject);
router.delete("/:id",protect, restrictTo("admin"), deleteProject);

export default router;
