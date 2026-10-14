import mongoose from "mongoose";

const assignmentLogSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    agent:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    note:    { type: String, default: "تعيين تلقائي" },
  },
  { timestamps: true }
);

const AssignmentLog = mongoose.model("AssignmentLog", assignmentLogSchema);
export default AssignmentLog;
