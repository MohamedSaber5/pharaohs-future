import { Router } from "express";
import { body }   from "express-validator";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import { protect }      from "../middlewares/auth.middleware.js";
import validate         from "../middlewares/validate.js";
import { authLimiter }  from "../config/rateLimiter.js";

const router = Router();

const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("الاسم مطلوب")
    .isLength({ max: 50 }).withMessage("الاسم لا يتجاوز 50 حرف"),
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("password")
    .notEmpty().withMessage("كلمة المرور مطلوبة")
    .isLength({ min: 8 }).withMessage("كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  body("phone")
    .optional({ nullable: true, checkFalsy: true })
    .isString(),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("البريد الإلكتروني مطلوب")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),
  body("password")
    .notEmpty().withMessage("كلمة المرور مطلوبة"),
];

router.post("/register", authLimiter, registerValidation, validate, register);
router.post("/login",    authLimiter, loginValidation,    validate, login);
router.post("/logout",   protect, logout);
router.get("/me",        protect, getMe);

export default router;
