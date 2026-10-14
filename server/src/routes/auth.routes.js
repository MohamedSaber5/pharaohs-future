import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.js";
import { authLimiter } from "../config/rateLimiter.js";

const router = Router();

// ─── Validation Rules ─────────────────────────────────────────────────────────

const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 50 }).withMessage("Name cannot exceed 50 characters"),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and a number"),
  body("phone")
    .optional()
    .isMobilePhone().withMessage("Please provide a valid phone number"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required"),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post("/register", authLimiter, registerValidation, validate, register);
router.post("/login", authLimiter, loginValidation, validate, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
