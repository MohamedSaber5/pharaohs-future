import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    project:  { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    type:     { type: String, required: [true, "نوع الوحدة مطلوب"], trim: true },
    area:     { type: Number, required: [true, "المساحة مطلوبة"], min: 1 },
    floor:    { type: Number, default: 1 },
    building: { type: String, default: "" },      // المبنى / البرج
    rooms:    { type: Number, default: 0 },
    bathrooms:{ type: Number, default: 1 },
    parking:  { type: Number, default: 0 },

    // ─── Pricing & Payment Terms ────────────────────────────────────
    price:               { type: Number, required: [true, "السعر مطلوب"], min: 0 },
    downPaymentPercent:  { type: Number, default: 10, min: 0, max: 100 }, // نسبة الدفعة المقدمة %
    installmentYears:    { type: Number, default: 5,  min: 0 },            // سنوات التقسيط
    deliveryDate:        { type: Date,   default: null },                   // تاريخ التسليم

    finishing: {
      type: String,
      enum: ["كامل التشطيب","نصف تشطيب","بدون تشطيب","Core & Shell","تشطيب فندقي"],
      default: "كامل التشطيب",
    },
    status: {
      type: String,
      enum: ["متاح","محجوز","مباع"],
      default: "متاح",
    },
    description: { type: String, default: "" },
    images:      [{ type: String }],
    features:    [{ type: String }],
    ref:         { type: String, unique: true, sparse: true },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: calculated down payment amount
unitSchema.virtual("downPaymentAmount").get(function () {
  if (typeof this.price !== "number") return 0;
  return Math.round((this.price * (this.downPaymentPercent || 0)) / 100);
});

// Virtual: monthly installment
unitSchema.virtual("monthlyInstallment").get(function () {
  if (typeof this.price !== "number" || !this.installmentYears || this.installmentYears <= 0) return 0;
  const downPayment = this.downPaymentAmount || 0;
  const remaining = this.price - downPayment;
  return Math.round(remaining / (this.installmentYears * 12));
});

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
