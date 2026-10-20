import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { uploadUnitImages } from "../middlewares/upload.js";
import {
  getAllUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
  uploadUnitImagesController,
} from "../controllers/unit.controller.js";

const router = Router();

// Image upload endpoint (admin)
router.post(
  "/upload-images",
  protect,
  restrictTo("admin"),
  (req, res, next) => {
    uploadUnitImages(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  uploadUnitImagesController
);

router.get("/", getAllUnits);
router.get("/:id", getUnit);
router.post("/", protect, restrictTo("admin"), createUnit);
router.patch("/:id", protect, restrictTo("admin"), updateUnit);
router.delete("/:id", protect, restrictTo("admin"), deleteUnit);

export default router;
