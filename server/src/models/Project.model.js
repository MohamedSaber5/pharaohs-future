import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "اسم المشروع مطلوب"], trim: true },
    nameEn: { type: String, trim: true, default: "" },
    location: { type: String, required: [true, "الموقع مطلوب"], trim: true },
    type: { type: String, required: [true, "نوع المشروع مطلوب"], trim: true },
    description: { type: String, default: "" },
    totalArea: { type: Number, default: 0 },
    totalUnits: { type: Number, default: 0 },
    startPrice: { type: Number, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    delivery: { type: String, default: "" },
    status: {
      type: String,
      enum: ["تحت الإنشاء", "قيد البيع", "مكتمل"],
      default: "قيد البيع",
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    license: { type: String, default: "" },
    developer: { type: String, default: "مستقبل الفراعنة" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: count units
projectSchema.virtual("units", {
  ref: "Unit",
  localField: "_id",
  foreignField: "project",
  count: true,
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
