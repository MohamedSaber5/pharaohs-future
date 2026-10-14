import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    type: { type: String, required: [true, "نوع الوحدة مطلوب"], trim: true },
    area: { type: Number, required: [true, "المساحة مطلوبة"], min: 1 },
    floor: { type: Number, default: 1 },
    rooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 1 },
    parking: { type: Number, default: 0 },
    price: { type: Number, required: [true, "السعر مطلوب"], min: 0 },
    finishing: {
      type: String,
      enum: ["سوبر لوكس", "تشطيب فندقي", "نصف تشطيب", "Core & Shell", "بدون تشطيب"],
      default: "سوبر لوكس",
    },
    status: {
      type: String,
      enum: ["متاح", "محجوز", "مباع"],
      default: "متاح",
    },
    description: { type: String, default: "" },
    images: [{ type: String }],
    features: [{ type: String }],
    ref: { type: String, unique: true, sparse: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
