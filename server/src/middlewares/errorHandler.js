import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

// ─── Mongoose Error Handlers ─────────────────────────────────────────────────

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    `Duplicate field value: "${value}" for field "${field}". Please use another value.`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

// ─── JWT Error Handlers ───────────────────────────────────────────────────────

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

// ─── Response Senders ─────────────────────────────────────────────────────────

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
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
    });
  } else {
    // Programming or unknown error: don't leak details
    logger.error("UNHANDLED ERROR:", err);
    res.status(500).json({
      success: false,
      status: "error",
      message: "Something went wrong. Please try again later.",
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
    let error = { ...err, message: err.message };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default errorHandler;
