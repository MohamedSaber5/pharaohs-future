import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  createReservation, getMyReservations, getAllReservations,
  updateReservationStatus, getReservationStats,
} from "../controllers/reservation.controller.js";

const router = Router();

// All routes require authentication
router.use(protect);

router.post("/",           createReservation);
router.get("/my",          getMyReservations);

// Admin routes
router.get("/stats",       restrictTo("admin"), getReservationStats);
router.get("/",            restrictTo("admin"), getAllReservations);
router.patch("/:id/status",restrictTo("admin"), updateReservationStatus);

export default router;
