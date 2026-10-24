import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/pharaohs-future";

const ADMIN = {
  name:     process.env.ADMIN_NAME || "System Admin",
  email:    process.env.ADMIN_EMAIL || "admin@pharaohs.com",
  password: process.env.ADMIN_PASSWORD || "Admin@2025!",
  phone:    process.env.ADMIN_PHONE || "+201000000000",
  role:     "admin",
};

async function createAdmin() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log("Connected!");

    const existing = await mongoose.connection.db.collection("users").findOne({ email: ADMIN.email });

    if (existing) {
      if (existing.role !== "admin") {
        await mongoose.connection.db.collection("users").updateOne({ email: ADMIN.email }, { $set: { role: "admin" } });
        console.log("Updated role to admin!");
      } else {
        console.log("Admin already exists!");
      }
    } else {
      const hashedPassword = await bcrypt.hash(ADMIN.password, 12);
      await mongoose.connection.db.collection("users").insertOne({
        name: ADMIN.name, email: ADMIN.email, password: hashedPassword,
        phone: ADMIN.phone, role: "admin", isActive: true,
        createdAt: new Date(), updatedAt: new Date(),
      });
      console.log("Admin created!");
    }

    console.log("\nAdmin Login:");
    console.log("Email:    " + ADMIN.email);
    console.log("Password: " + ADMIN.password);
    console.log("URL:      http://localhost:5173/auth");
  } catch (err) {
    console.error("Error:", err.message);
    if (err.message.includes("IP")) {
      console.log("\nFix: Add your IP 156.221.176.198 to MongoDB Atlas Network Access");
      console.log("Or allow 0.0.0.0/0 for development");
    }
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
