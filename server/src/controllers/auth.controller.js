import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import sendEmail, { generateOtpEmailHtml } from "../utils/sendEmail.js";

// ─── Token Helpers ────────────────────────────────────────────────────────────

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // HTTP-only cookie for security (XSS protection)
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("accessToken", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  sendSuccess(res, statusCode, "Authentication successful", { token, user });
};

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("An account with this email already exists.", 409));
  }

  const newUser = await User.create({ name, email, password, phone });
  createSendToken(newUser, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password.", 401));
  }

  if (!user.isActive) {
    return next(new AppError("Your account has been deactivated. Please contact support.", 403));
  }

  createSendToken(user, 200, res);
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  sendSuccess(res, 200, "Logged out successfully");
};

/**
 * @desc    Get current authenticated user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = catchAsync(async (req, res) => {
  sendSuccess(res, 200, "User profile retrieved", req.user);
});

// ─── Forgot & Reset Password via Email & OTP ──────────────────────────────────

/**
 * @desc    Request 6-digit OTP to reset password via email
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("يرجى إدخال البريد الإلكتروني", 400));

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  // Always return success response to prevent email discovery attacks
  if (!user) {
    return sendSuccess(
      res,
      200,
      "إذا كان هذا البريد مسجلاً لدينا، فقد تم إرسال رمز التحقق إلى بريدك الإلكتروني."
    );
  }

  if (!user.isActive) {
    return next(new AppError("تم إلغاء تنشيط هذا الحساب. يرجى التواصل مع الإدارة.", 403));
  }

  // Generate 6-digit OTP and set expiry (10 mins)
  const otp = user.createPasswordResetOTP();
  await user.save({ validateBeforeSave: false });

  try {
    const html = generateOtpEmailHtml(user.name, otp);
    await sendEmail({
      email: user.email,
      subject: "رمز التحقق لإعادة تعيين كلمة المرور - مستقبل الفراعنة",
      message: `رمز التحقق الخاص بك هو: ${otp} (صالح لمدة 10 دقائق)`,
      html,
    });

    sendSuccess(
      res,
      200,
      "تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني بنجاح."
    );
  } catch (err) {
    user.passwordResetOtp = undefined;
    user.passwordResetOtpExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("تعذر إرسال البريد الإلكتروني. يرجى المحاولة لاحقاً.", 500));
  }
});

/**
 * @desc    Verify 6-digit OTP
 * @route   POST /api/v1/auth/verify-otp
 * @access  Public
 */
export const verifyOTP = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new AppError("يرجى إدخال البريد الإلكتروني ورمز التحقق", 400));
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanOtp = otp.toString().trim();
  const hashedOtp = crypto.createHash("sha256").update(cleanOtp).digest("hex");

  const user = await User.findOne({
    email: cleanEmail,
    passwordResetOtp: hashedOtp,
    passwordResetOtpExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("رمز التحقق غير صحيح أو انتهت صلاحيته (صلاحية الرمز 10 دقائق)", 400)
    );
  }

  user.passwordResetVerified = true;
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, 200, "تم التحقق من الرمز بنجاح. يمكنك الآن تعيين كلمة مرور جديدة.");
});

/**
 * @desc    Reset password after OTP verification
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return next(new AppError("يرجى ملء جميع الحقول المطلوبة", 400));
  }

  if (newPassword.length < 8) {
    return next(new AppError("كلمة المرور يجب أن تكون 8 أحرف على الأقل", 400));
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanOtp = otp.toString().trim();
  const hashedOtp = crypto.createHash("sha256").update(cleanOtp).digest("hex");

  const user = await User.findOne({
    email: cleanEmail,
    passwordResetOtp: hashedOtp,
    passwordResetOtpExpires: { $gt: Date.now() },
  });

  if (!user || !user.passwordResetVerified) {
    return next(
      new AppError("جلسة التحقق غير صالحة أو انتهت مدتها. يرجى إعادة طلب رمز التحقق.", 400)
    );
  }

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  user.passwordResetOtp = undefined;
  user.passwordResetOtpExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

// ─── Legacy Reset Password via Phone (Fallback) ───────────────────────────────

export const resetPasswordByPhone = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return next(
      new AppError(
        "هذه الطريقة معطلة في بيئة الإنتاج لدواعي أمنية. يرجى استخدام استعادة كلمة المرور عبر البريد الإلكتروني ورمز التحقق (OTP).",
        403
      )
    );
  }
  const { phone, newPassword } = req.body;
  if (!phone || !newPassword) return next(new AppError('يرجى إدخال رقم الهاتف وكلمة المرور الجديدة', 400));
  if (newPassword.length < 8) return next(new AppError('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 400));

  const cleanPhone = phone.trim();
  const user = await User.findOne({ phone: cleanPhone }).select('+password');
  if (!user) return next(new AppError('لا يوجد حساب مرتبط بهذا الرقم', 404));

  if (user.role === "admin" || user.role === "employee") {
    return next(new AppError("لا يمكن إعادة تعيين كلمة مرور موظف أو مسؤول من هنا. يرجى مراجعة إدارة النظام.", 403));
  }

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  createSendToken(user, 200, res);
});

