/**
 * Wraps async route handlers to avoid try/catch boilerplate.
 * Automatically passes errors to Express error middleware.
 *
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsync;
