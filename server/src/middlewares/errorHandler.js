import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

// ─── Mongoose Error Handlers ─────────────────────────────────────────────────

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

const handleDuplicateFieldsDB = (err) => {
  const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
  const value = err.keyValue ? err.keyValue[field] : "duplicate value";
  return new AppError(
    `قيمة مكررة: "${value}" للحقل "${field}". يرجى استخدام قيمة أخرى.`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors || {}).map((el) => el.message);
  return new AppError(`بيانات غير صحيحة: ${errors.join(". ")}`, 400);
};

// ─── JWT Error Handlers ───────────────────────────────────────────────────────

const handleJWTError = () =>
  new AppError("جلسة غير صالحة. يرجى تسجيل الدخول مجدداً.", 401);

const handleJWTExpiredError = () =>
  new AppError("انتهت صلاحية جلستك. يرجى تسجيل الدخول مجدداً.", 401);

// ─── Response Senders ─────────────────────────────────────────────────────────

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    errors: err.errors || undefined,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Trusted, operational error: send message to client
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      errors: err.errors || undefined,
    });
  } else {
    // Programming or unknown error: don't leak details
    logger.error("UNHANDLED ERROR:", err);
    res.status(500).json({
      success: false,
      status: "error",
      message: "حدث خطأ غير متوقع في الخادم. يرجى المحاولة لاحقاً.",
    });
  }
};

// ─── Global Error Middleware ──────────────────────────────────────────────────

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  logger.error(`${err.statusCode} - ${err.message} - ${req.method} ${req.originalUrl}`);

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = err;

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default errorHandler;
