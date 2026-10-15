import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join }  from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
import mongoSanitize from "express-mongo-sanitize";

import { apiLimiter } from "./config/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import logger from "./utils/logger.js";

// ─── Route Imports ────────────────────────────────────────────────────────────
import healthRoutes from "./routes/health.routes.js";
import authRoutes    from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import unitRoutes        from './routes/unit.routes.js';
import reservationRoutes from './routes/reservation.routes.js';

const app = express();

// ─── Security Middlewares ─────────────────────────────────────────────────────

// Set security HTTP headers
app.use(helmet());

// CORS configuration

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5175",
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
    : []),
];


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin "${origin}" is not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Sanitize user input against NoSQL injection attacks
app.use(mongoSanitize());

// ─── General Middlewares ──────────────────────────────────────────────────────

// Request logging (skip in test environments)
if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

// Parse JSON bodies (limit to 10kb to prevent abuse)
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Parse cookies
app.use(cookieParser());

// Compress responses
app.use(compression());

// Serve uploaded images
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

// Apply global rate limiting to all API routes
app.use("/api", apiLimiter);

// ─── API Routes ───────────────────────────────────────────────────────────────

const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/health`, healthRoutes);
app.use(`${API_PREFIX}/auth`,     authRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/units`,    unitRoutes);
app.use(`/reservations`, reservationRoutes);

// ─── Root Route ───────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Pharaohs Future Real Estate API",
    version: "v1",
    docs: `${req.protocol}://${req.get("host")}${API_PREFIX}/health`,
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl} on this server.`, 404));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler);

export default app;




