import { sendSuccess } from "../utils/apiResponse.js";

/**
 * @desc    Health check endpoint
 * @route   GET /api/v1/health
 * @access  Public
 */
export const healthCheck = (req, res) => {
  sendSuccess(res, 200, "Pharaohs Future API is running", {
    status: "healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};
