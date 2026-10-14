import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["معلّق", "مؤكد", "مكتمل", "ملغي"],
      default: "معلّق",
    },
    notes: { type: String, default: "" },
    adminNotes: { type: String, default: "" },
    confirmedAt: { type: Date },
    cancelledAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent double reservations for same unit (only one active)
reservationSchema.index(
  { unit: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["معلّق", "مؤكد"] } } }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
