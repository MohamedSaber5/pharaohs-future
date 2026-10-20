import { describe, it } from "node:test";
import assert from "node:assert/strict";
import Unit from "../src/models/Unit.model.js";
import User from "../src/models/User.model.js";

describe("Data Models & Business Logic Tests", () => {
  it("should accurately calculate down payment amount virtual", () => {
    const unit = new Unit({
      type: "شقة",
      area: 150,
      price: 2_000_000,
      downPaymentPercent: 15,
      installmentYears: 5,
    });

    assert.equal(unit.downPaymentAmount, 300_000);
  });

  it("should accurately calculate monthly installment virtual", () => {
    const unit = new Unit({
      type: "شقة",
      area: 150,
      price: 2_000_000,
      downPaymentPercent: 20, // 400,000 down, 1,600,000 remaining
      installmentYears: 4,    // 48 months -> ~33,333
    });

    assert.equal(unit.downPaymentAmount, 400_000);
    assert.equal(unit.monthlyInstallment, Math.round(1_600_000 / 48));
  });

  it("should return 0 monthly installment if installmentYears is 0 or price missing", () => {
    const unitZero = new Unit({
      type: "محل",
      area: 50,
      price: 1_000_000,
      installmentYears: 0,
    });
    assert.equal(unitZero.monthlyInstallment, 0);

    const unitNoPrice = new Unit({
      type: "استوديو",
      area: 40,
    });
    assert.equal(unitNoPrice.downPaymentAmount, 0);
    assert.equal(unitNoPrice.monthlyInstallment, 0);
  });

  it("should verify passwordChangedAfter method on User model", () => {
    const user = new User({
      name: "أحمد علي",
      email: "ahmed@example.com",
      password: "password123",
      passwordChangedAt: new Date(Date.now() + 5000), // changed in the future compared to issued token
    });

    // Token issued before password change (e.g. 10 seconds ago)
    const tokenIatBefore = parseInt((Date.now() - 10000) / 1000, 10);
    assert.equal(user.changedPasswordAfter(tokenIatBefore), true);

    // Token issued after password change
    const tokenIatAfter = parseInt((Date.now() + 20000) / 1000, 10);
    assert.equal(user.changedPasswordAfter(tokenIatAfter), false);
  });
});
