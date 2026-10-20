import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.model.js";

/**
 * Protect routes - verify JWT token
 */
export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Get token from Authorization header or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to access this route.", 401)
    );
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).select("-password");
  if (!currentUser) {
    return next(new AppError("The user belonging to this token no longer exists.", 401));
  }

  // 4) Check if user is active
  if (!currentUser.isActive) {
    return next(new AppError("تم إلغاء تنشيط هذا الحساب. يرجى التواصل مع الإدارة.", 403));
  }

  // 5) Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("تم تغيير كلمة المرور مؤخراً. يرجى تسجيل الدخول مرة أخرى.", 401));
  }

  // 6) Attach user to request
  req.user = currentUser;
  next();
});

/**
 * Restrict routes to specific roles
 * @param {...string} roles - Allowed roles
 */
export const restrictTo = (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
