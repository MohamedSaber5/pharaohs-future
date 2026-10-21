import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import escapeRegex from "../src/utils/escapeRegex.js";

describe("Security & Middleware Tests", () => {
  before(async () => {
    if (process.env.MONGODB_URI && mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 }).catch(() => {});
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect().catch(() => {});
    }
  });

  it("should set Helmet security headers", async () => {
    const res = await request(app).get("/api/v1/health");
    assert.equal(res.status, 200);
    assert.equal(res.headers["cross-origin-resource-policy"], "cross-origin");
    assert.ok(res.headers["x-content-type-options"], "X-Content-Type-Options should be set");
  });

  it("should handle 404 routes gracefully with structured JSON", async () => {
    const res = await request(app).get("/api/v1/non-existent-route");
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("Cannot find GET"));
  });

  it("should escape special regex characters to prevent ReDoS", () => {
    const maliciousInput = "(a+)+$ [abc] {1,5} * ? ^ . \\";
    const escaped = escapeRegex(maliciousInput);
    assert.doesNotMatch(escaped, /\(a\+\)\+\$/);
    assert.equal(typeof escaped, "string");
    // Verify that the escaped string can be safely passed to new RegExp without throwing
    assert.doesNotThrow(() => new RegExp(escaped, "i"));
    assert.equal(escapeRegex(123), "");
  });

  it("should reject invalid login bodies with validation errors", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "invalid-email-format", password: "" });

    assert.equal(res.status, 422);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message, "Should return human-readable validation error message");
  });

  it("should reject invalid reset-password-phone without valid phone or short password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/reset-password-phone")
      .send({ phone: "", newPassword: "123" });

    assert.ok([400, 422].includes(res.status));
    assert.equal(res.body.success, false);
  });

  it("should reject registration with phone numbers longer or shorter than 11 digits", async () => {
    // 12 digits
    const resTooLong = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "محمد أحمد",
        email: "test@example.com",
        phone: "010123456789", // 12 digits
        password: "Password123!",
      });
    assert.equal(resTooLong.status, 422);

    // 10 digits
    const resTooShort = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "محمد أحمد",
        email: "test@example.com",
        phone: "0101234567", // 10 digits
        password: "Password123!",
      });
    assert.equal(resTooShort.status, 422);

    // Invalid prefix
    const resBadPrefix = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "محمد أحمد",
        email: "test@example.com",
        phone: "01912345678", // starts with 019
        password: "Password123!",
      });
    assert.equal(resBadPrefix.status, 422);
  });

  it("should reject registration with weak passwords", async () => {
    const resWeak = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "محمد أحمد",
        email: "test2@example.com",
        phone: "01012345678",
        password: "password", // only lowercase, no uppercase, no numbers
      });
    assert.equal(resWeak.status, 422);
    assert.ok(resWeak.body.message.includes("كلمة المرور"));
  });

  it("should validate email format in forgot-password endpoint", async () => {
    const resInvalid = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email: "not-an-email" });
    assert.equal(resInvalid.status, 422);

    if (mongoose.connection.readyState === 1) {
      const resValid = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: "user@example.com" });
      assert.equal(resValid.status, 200);
      assert.equal(resValid.body.success, true);
    }
  });

  it("should reject verify-otp if otp is not 6 digits", async () => {
    const resShortOtp = await request(app)
      .post("/api/v1/auth/verify-otp")
      .send({ email: "user@example.com", otp: "123" });
    assert.equal(resShortOtp.status, 422);

    const resLongOtp = await request(app)
      .post("/api/v1/auth/verify-otp")
      .send({ email: "user@example.com", otp: "1234567" });
    assert.equal(resLongOtp.status, 422);
  });

  it("should reject reset-password if new password is weak", async () => {
    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({ email: "user@example.com", otp: "123456", newPassword: "weak" });
    assert.equal(res.status, 422);
  });
});
