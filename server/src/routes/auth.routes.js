import { Router } from "express";
import { body }   from "express-validator";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resetPasswordByPhone,
} from "../controllers/auth.controller.js";
import { protect }      from "../middlewares/auth.middleware.js";
import validate         from "../middlewares/validate.js";
import { authLimiter }  from "../config/rateLimiter.js";

const router = Router();

const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("الاسم مطلوب")
    .isLength({ min: 2, max: 50 }).withMessage("الاسم يجب أن يكون بين حرفين و 50 حرفاً"),
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("phone")
    .trim()
    .notEmpty().withMessage("رقم الهاتف مطلوب")
    .matches(/^(010|011|012|015)\d{8}$/)
    .withMessage("رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)"),
  body("password")
    .notEmpty().withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 8 }).withMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .withMessage("كلمة المرور يجب أن تكون قوية وتحتوي على أحرف كبيرة وصغيرة وأرقام أو رموز"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("password")
    .notEmpty().withMessage("كلمة المرور مطلوبة"),
];

const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
];

const verifyOtpValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("otp")
    .trim()
    .notEmpty().withMessage("رمز التحقق مطلوب")
    .isLength({ min: 6, max: 6 }).withMessage("رمز التحقق يجب أن يتكون من 6 أرقام")
    .isNumeric().withMessage("رمز التحقق يجب أن يكون أرقاماً فقط"),
];

const resetPasswordValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("otp")
    .trim()
    .notEmpty().withMessage("رمز التحقق مطلوب")
    .isLength({ min: 6, max: 6 }).withMessage("رمز التحقق يجب أن يتكون من 6 أرقام"),
  body("newPassword")
    .notEmpty().withMessage("كلمة المرور الجديدة مطلوبة")
    .isLength({ min: 8 }).withMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .withMessage("كلمة المرور الجديدة يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام أو رموز"),
];

// Routes
router.post("/register", authLimiter, registerValidation, validate, register);
router.post("/login",    authLimiter, loginValidation,    validate, login);
router.post("/logout",   protect, logout);
router.get("/me",        protect, getMe);

// Email + OTP Password Reset Flow
router.post("/forgot-password", authLimiter, forgotPasswordValidation, validate, forgotPassword);
router.post("/verify-otp",      authLimiter, verifyOtpValidation,      validate, verifyOTP);
router.post("/reset-password",   authLimiter, resetPasswordValidation,  validate, resetPassword);

// Fallback phone route
router.post("/reset-password-phone", authLimiter, resetPasswordByPhone);

export default router;

