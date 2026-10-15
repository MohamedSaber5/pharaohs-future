import { startExpiryCron } from './jobs/expiryCron.js';
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

// ─── Start Server ─────────────────────────────────────────────────────────────

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const server = app.listen(PORT, () => {
      startExpiryCron();
      logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      logger.info(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
    });

    // ─── Graceful Shutdown ────────────────────────────────────────────────────

    const gracefulShutdown = (signal) => {
      logger.info(`\n⚠️  ${signal} received. Shutting down gracefully...`);
      server.close(() => {
        logger.info("✅ HTTP server closed.");
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error("❌ Could not close connections in time. Forcefully shutting down.");
        process.exit(1);
      }, 10_000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // ─── Unhandled Rejections & Uncaught Exceptions ───────────────────────────

    process.on("unhandledRejection", (err) => {
      logger.error(`Unhandled Rejection: ${err.name} - ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err) => {
      logger.error(`Uncaught Exception: ${err.name} - ${err.message}`);
      process.exit(1);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
