import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "الاسم مطلوب"],
      trim: true,
      maxlength: [50, "الاسم لا يتجاوز 50 حرف"],
    },
    email: {
      type: String,
      required: [true, "البريد الإلكتروني مطلوب"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "يرجى تقديم بريد إلكتروني صالح"],
    },
    password: {
      type: String,
      required: [true, "كلمة المرور مطلوبة"],
      minlength: [8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },
    phone: { type: String, trim: true },
    whatsapp: { type: String, trim: true }, // for employees
    avatar: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    
    // Employee Rotation Management
    rotationActive: { type: Boolean, default: true }, // active in round-robin queue
    rotationOrder:  { type: Number, default: 0 },     // sequence priority in queue
    assignedCount:  { type: Number, default: 0 },     // track workload

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    passwordResetOtp: String,
    passwordResetOtpExpires: Date,
    passwordResetVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetOTP = function () {
  // Generate random 6-digit OTP string
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash OTP and set expiry (10 minutes)
  this.passwordResetOtp = crypto.createHash("sha256").update(otp).digest("hex");
  this.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  this.passwordResetVerified = false;

  return otp;
};

const User = mongoose.model("User", userSchema);
export default User;
