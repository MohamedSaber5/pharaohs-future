import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { uploadProjectImages } from "../middlewares/upload.js";
import {
  getAllProjects, getProject, createProject,
  updateProject, deleteProject, getProjectStats,
  uploadImages,
} from "../controllers/project.controller.js";

const router = Router();

// Admin stats
router.get("/stats", protect, restrictTo("admin"), getProjectStats);

// Image upload endpoint (admin)
router.post(
  "/upload-images",
  protect,
  restrictTo("admin"),
  (req, res, next) => {
    uploadProjectImages(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  uploadImages
);

// Public
router.get("/",    getAllProjects);
router.get("/:id", getProject);

// Admin CRUD
router.post("/",     protect, restrictTo("admin"), createProject);
router.patch("/:id", protect, restrictTo("admin"), updateProject);
router.delete("/:id",protect, restrictTo("admin"), deleteProject);

export default router;
