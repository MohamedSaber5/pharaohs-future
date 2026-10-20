/**
 * Custom Application Error class for structured error handling.
 * Use this instead of throwing generic Error objects in controllers/services.
 */
class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404, 500)
   * @param {boolean} isOperational - True for expected errors (validation, auth), false for programming errors
   * @param {Array} errors - Optional list of detailed errors
   */
  constructor(message, statusCode, isOperational = true, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;
    if (errors) this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
