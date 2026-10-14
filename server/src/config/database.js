import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    logger.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // Mongoose 8+ handles most options automatically
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected.");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
