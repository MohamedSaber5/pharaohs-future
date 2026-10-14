import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://mohamedmahmoudsbr11_db_user:U9CkoEyKZG5BkHip@pharaohs-cluster.lntvpkt.mongodb.net/pharaohs-future?retryWrites=true&w=majority&appName=pharaohs-cluster";

const ADMIN = {
  name:     "Mohamed Admin",
  email:    "admin@pharaohs.com",
  password: "Admin@2025!",
  phone:    "+201000000000",
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
