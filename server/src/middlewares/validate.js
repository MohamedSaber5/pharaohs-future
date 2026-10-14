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

    return next(
      new AppError("Validation failed. Please check your inputs.", 422)
    );
  }

  next();
};

export default validate;
