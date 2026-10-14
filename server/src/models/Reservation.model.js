import mongoose from "mongoose";

// Real estate reservation stages
// طلب حجز → قيد المراجعة → محجوز → جاهز للتعاقد → مكتمل / ملغي / منتهي الصلاحية
const STATUSES = ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد", "مكتمل", "ملغي", "منتهي الصلاحية"];

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
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: "طلب حجز",
    },
    // If agent booked on behalf of user
    bookedByAgent: { type: Boolean, default: false },
    clientPhone:   { type: String, default: "" }, // for agent-booked reservations

    notes:      { type: String, default: "" },
    agentNotes: { type: String, default: "" },

    // Status history log
    statusHistory: [{
      status:    { type: String, enum: STATUSES },
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      note:      { type: String, default: "" },
      changedAt: { type: Date, default: Date.now },
    }],

    // Auto-expire: 7 days from creation if not progressed past "طلب حجز"
    expiresAt:    { type: Date },
    confirmedAt:  { type: Date },
    cancelledAt:  { type: Date },
    completedAt:  { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent double active reservations on same unit
reservationSchema.index(
  { unit: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد"] }
    }
  }
);

// Set expiry 7 days from creation
reservationSchema.pre("save", function (next) {
  if (this.isNew && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

export const RESERVATION_STATUSES = STATUSES;
const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
