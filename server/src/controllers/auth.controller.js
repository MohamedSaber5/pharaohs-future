import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

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
  res.cookie("accessToken", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
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
