import logger from "../utils/logger.js";
import AppError from "../utils/AppError.js";

/**
 * Optional / Pluggable CAPTCHA Verification Middleware (Cloudflare Turnstile or Google reCAPTCHA)
 * If CAPTCHA_SECRET_KEY is defined in .env, it verifies the token.
 * If not defined, it permits the request to pass through (useful for dev and gradual rollout).
 */
export const verifyCaptcha = async (req, res, next) => {
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;

  // If no secret key is set, skip CAPTCHA check gracefully
  if (!secretKey) {
    return next();
  }

  const token =
    req.body?.captchaToken ||
    req.headers["x-captcha-token"] ||
    req.body?.["cf-turnstile-response"] ||
    req.body?.["g-recaptcha-response"];

  if (!token) {
    return next(
      new AppError("يرجى إكمال التحقق الأمني (CAPTCHA) قبل المتابعة.", 400)
    );
  }

  try {
    const isTurnstile = Boolean(process.env.TURNSTILE_SECRET_KEY);
    const verifyUrl = isTurnstile
      ? "https://challenges.cloudflare.com/turnstile/v0/siteverify"
      : "https://www.google.com/recaptcha/api/siteverify";

    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: req.ip,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      logger.warn(`CAPTCHA verification failed for IP: ${req.ip}`);
      return next(
        new AppError("فشل التحقق الأمني. يرجى إعادة المحاولة.", 400)
      );
    }

    next();
  } catch (err) {
    logger.error(`Error during CAPTCHA verification: ${err.message}`);
    // In case of external service downtime, avoid locking out users unless strictly enforced
    if (process.env.CAPTCHA_STRICT === "true") {
      return next(new AppError("تعذر التحقق من مزود الحماية. يرجى المحاولة لاحقاً.", 500));
    }
    next();
  }
};

export default verifyCaptcha;
