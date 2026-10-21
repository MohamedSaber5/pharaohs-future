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

import { body } from "express-validator";
import validate from "../middlewares/validate.js";

const router = Router();
router.use(protect);

const createReservationValidation = [
  body("unitId")
    .notEmpty().withMessage("معرف الوحدة مطلوب")
    .isMongoId().withMessage("معرف الوحدة غير صحيح"),
];

const agentBookValidation = [
  body("unitId")
    .notEmpty().withMessage("معرف الوحدة مطلوب")
    .isMongoId().withMessage("معرف الوحدة غير صحيح"),
  body("clientName")
    .trim()
    .notEmpty().withMessage("اسم العميل مطلوب")
    .isLength({ min: 2, max: 50 }).withMessage("اسم العميل يجب أن يكون بين حرفين و 50 حرفاً"),
  body("clientPhone")
    .trim()
    .notEmpty().withMessage("رقم هاتف العميل مطلوب")
    .matches(/^(010|011|012|015)\d{8}$/)
    .withMessage("رقم هاتف العميل يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)"),
];

// User
router.post("/", createReservationValidation, validate, createReservation);
router.get("/my", getMyReservations);

// Employee & Admin
router.post("/agent-book", restrictTo("employee", "admin"), agentBookValidation, validate, agentBookForClient);
router.get("/assigned", restrictTo("employee", "admin"), getAssignedReservations);
router.patch("/:id/status", restrictTo("admin", "employee"), updateReservationStatus);
router.post("/:id/cancel", restrictTo("admin", "employee"), cancelReservation);

// Admin
router.get("/stats", restrictTo("admin"), getReservationStats);
router.get("/assignment-logs", restrictTo("admin"), getAssignmentLogs);
router.get("/", restrictTo("admin", "employee"), getAllReservations);

export default router;
