import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

/**
 * Middleware to validate request using express-validator rules.
 * Place after validation chain in route definitions.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    const firstMsg = extractedErrors[0]?.message || "Validation failed. Please check your inputs.";
    return next(new AppError(firstMsg, 422, true, extractedErrors));
  }

  next();
};

export default validate;
