import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";
import escapeRegex from "../src/utils/escapeRegex.js";

describe("Security & Middleware Tests", () => {
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

    assert.equal(res.status, 422);
    assert.equal(res.body.success, false);
  });
});
