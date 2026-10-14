/**
 * Standard API response helper.
 * Ensures consistent response shape across all endpoints.
 */

/**
 * Send a success response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Human-readable message
 * @param {*} data - Response payload
 * @param {object} meta - Optional pagination/metadata
 */
export const sendSuccess = (res, statusCode, message, data = null, meta = null) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) response.data = data;
  if (meta !== null) response.meta = meta;

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {*} errors - Validation errors or additional info
 */
export const sendError = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) response.errors = errors;

  return res.status(statusCode).json(response);
};
