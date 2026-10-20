import { Router } from "express";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import {
  createReservation,
  agentBookForClient,
  getMyReservations,
  getAssignedReservations,
  updateReservationStatus,
  cancelReservation,
  getAllReservations,
  getReservationStats,
  getAssignmentLogs,
} from "../controllers/reservation.controller.js";

const router = Router();
router.use(protect);

// User
router.post("/", createReservation);
router.get("/my", getMyReservations);

// Employee & Admin
router.post("/agent-book", restrictTo("employee", "admin"), agentBookForClient);
router.get("/assigned", restrictTo("employee", "admin"), getAssignedReservations);
router.patch("/:id/status", restrictTo("admin", "employee"), updateReservationStatus);
router.post("/:id/cancel", restrictTo("admin", "employee"), cancelReservation);

// Admin
router.get("/stats", restrictTo("admin"), getReservationStats);
router.get("/assignment-logs", restrictTo("admin"), getAssignmentLogs);
router.get("/", restrictTo("admin", "employee"), getAllReservations);

export default router;
