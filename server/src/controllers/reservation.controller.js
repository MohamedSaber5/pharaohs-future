import Reservation, { RESERVATION_STATUSES } from "../models/Reservation.model.js";
import Unit           from "../models/Unit.model.js";
import User           from "../models/User.model.js";
import AssignmentLog  from "../models/AssignmentLog.model.js";
import catchAsync     from "../utils/catchAsync.js";
import AppError       from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// ── Active statuses (unit is locked) ──────────────────────────────
const ACTIVE = ["طلب حجز","قيد المراجعة","محجوز","جاهز للتعاقد"];

// ── Round-robin: get next available employee ───────────────────────
const assignAgent = async () => {
  const agents = await User.find({ role:"employee", isActive:true })
    .sort({ assignedCount:1, createdAt:1 })
    .select("_id name phone whatsapp assignedCount");
  if (!agents.length) return null;
  // Pick the one with fewest assignments; ties broken by createdAt
  const agent = agents[0];
  await User.findByIdAndUpdate(agent._id, { $inc:{ assignedCount:1 } });
  return agent;
};

// ── POST /reservations (user books a unit) ─────────────────────────
export const createReservation = catchAsync(async (req, res, next) => {
  const { unitId, notes } = req.body;

  const unit = await Unit.findById(unitId);
  if (!unit || !unit.isActive) return next(new AppError("الوحدة غير موجودة", 404));
  if (unit.status !== "متاح")
    return next(new AppError("هذه الوحدة ليست متاحة للحجز", 400));

  // Limit: max 3 active reservations per user
  const activeCount = await Reservation.countDocuments({
    user: req.user._id, status: { $in: ACTIVE }
  });
  if (activeCount >= 3)
    return next(new AppError("لا يمكنك تقديم أكثر من 3 طلبات حجز نشطة في نفس الوقت", 400));

  // Check no active reservation for same unit
  const existing = await Reservation.findOne({ unit: unitId, status: { $in: ACTIVE } });
  if (existing) return next(new AppError("هذه الوحدة محجوزة بالفعل", 400));

  // Assign agent (round-robin)
  const agent = await assignAgent();

  // Lock unit
  await Unit.findByIdAndUpdate(unitId, { status: "محجوز" });

  const reservation = await Reservation.create({
    user:    req.user._id,
    unit:    unitId,
    project: unit.project,
    agent:   agent?._id ?? null,
    notes:   notes ?? "",
    statusHistory: [{ status:"طلب حجز", changedBy:req.user._id, note:"طلب حجز جديد" }],
  });

  // Log assignment
  if (agent) {
    await AssignmentLog.create({
      user: req.user._id, agent: agent._id,
      reservation: reservation._id, note:"تعيين تلقائي عند الحجز",
    });
  }

  const populated = await reservation.populate([
    { path:"user",    select:"name email phone" },
    { path:"unit",    populate:{ path:"project", select:"name location images" } },
    { path:"agent",   select:"name phone whatsapp" },
  ]);

  sendSuccess(res, 201, "تم تقديم طلب الحجز بنجاح", populated);
});

// ── POST /reservations/agent-book (employee books for client) ──────
export const agentBookForClient = catchAsync(async (req, res, next) => {
  const { unitId, clientPhone, clientName, notes } = req.body;
  if (!clientPhone || !clientName)
    return next(new AppError("يرجى إدخال اسم العميل ورقم هاتفه", 400));

  const unit = await Unit.findById(unitId);
  if (!unit || !unit.isActive) return next(new AppError("الوحدة غير موجودة", 404));
  if (unit.status !== "متاح")
    return next(new AppError("هذه الوحدة ليست متاحة للحجز", 400));

  const existing = await Reservation.findOne({ unit: unitId, status: { $in: ACTIVE } });
  if (existing) return next(new AppError("هذه الوحدة محجوزة بالفعل", 400));

  // Find or create a placeholder user for the client
  let clientUser = await User.findOne({ phone: clientPhone });
  if (!clientUser) {
    clientUser = await User.create({
      name: clientName, email: `${clientPhone}@placeholder.com`,
      password: Math.random().toString(36).slice(-10) + "A1",
      phone: clientPhone, role: "user",
    });
  }

  await Unit.findByIdAndUpdate(unitId, { status: "محجوز" });

  const reservation = await Reservation.create({
    user:         clientUser._id,
    unit:         unitId,
    project:      unit.project,
    agent:        req.user._id,
    bookedByAgent:true,
    clientPhone,
    notes:        notes ?? "",
    statusHistory:[{ status:"طلب حجز", changedBy:req.user._id, note:`حجز من قِبل الموظف لصالح ${clientName}` }],
  });

  await AssignmentLog.create({
    user:req.user._id, agent:req.user._id,
    reservation:reservation._id, note:`حجز يدوي من الموظف لصالح ${clientName}`,
  });

  const populated = await reservation.populate([
    { path:"unit",  populate:{ path:"project", select:"name location" } },
    { path:"agent", select:"name phone whatsapp" },
  ]);
  sendSuccess(res, 201, "تم الحجز بنجاح باسم العميل", populated);
});

// ── GET /reservations/my ───────────────────────────────────────────
export const getMyReservations = catchAsync(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id })
    .populate("unit",    "type area floor rooms price finishing status")
    .populate("project", "name location images")
    .populate("agent",   "name phone whatsapp")
    .sort({ createdAt:-1 });
  sendSuccess(res, 200, "ok", reservations);
});

// ── GET /reservations/assigned (employee sees own) ─────────────────
export const getAssignedReservations = catchAsync(async (req, res) => {
  const { status, page=1, limit=20 } = req.query;
  const filter = { agent: req.user._id };
  if (status) filter.status = status;
  const skip = (Number(page)-1)*Number(limit);
  const [items, total] = await Promise.all([
    Reservation.find(filter)
      .populate("user","name email phone")
      .populate("unit","type area floor rooms price finishing ref")
      .populate("project","name location")
      .sort({ createdAt:-1 }).skip(skip).limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "ok", { reservations:items, total, page:Number(page), pages:Math.ceil(total/Number(limit)) });
});

// ── PATCH /reservations/:id/status (employee or admin) ────────────
export const updateReservationStatus = catchAsync(async (req, res, next) => {
  const { status, agentNotes } = req.body;
  if (!RESERVATION_STATUSES.includes(status))
    return next(new AppError("حالة غير صالحة", 400));

  const reservation = await Reservation.findById(req.params.id).populate("unit");
  if (!reservation) return next(new AppError("الحجز غير موجود", 404));

  // Employee can only update their own assignments
  if (req.user.role === "employee" &&
      reservation.agent?.toString() !== req.user._id.toString())
    return next(new AppError("غير مصرح لك بتعديل هذا الحجز", 403));

  const prev = reservation.status;
  reservation.status     = status;
  reservation.agentNotes = agentNotes ?? reservation.agentNotes;
  reservation.statusHistory.push({ status, changedBy:req.user._id, note:agentNotes??""});

  if (status === "محجوز")           reservation.confirmedAt  = new Date();
  if (status === "مكتمل")          { reservation.completedAt  = new Date(); }
  if (status === "ملغي" || status === "منتهي الصلاحية") {
    reservation.cancelledAt = new Date();
    // Free the unit
    if (ACTIVE.includes(prev)) {
      await Unit.findByIdAndUpdate(reservation.unit._id, { status:"متاح" });
    }
  }
  if (status === "مكتمل") {
    await Unit.findByIdAndUpdate(reservation.unit._id, { status:"مباع" });
  }

  await reservation.save();
  sendSuccess(res, 200, "تم تحديث حالة الحجز", reservation);
});

// ── GET /reservations (admin) ──────────────────────────────────────
export const getAllReservations = catchAsync(async (req, res) => {
  const { status, project, agent, page=1, limit=20 } = req.query;
  const filter = {};
  if (status)  filter.status  = status;
  if (project) filter.project = project;
  if (agent)   filter.agent   = agent;
  const skip = (Number(page)-1)*Number(limit);
  const [items, total] = await Promise.all([
    Reservation.find(filter)
      .populate("user","name email phone")
      .populate("unit","type area floor rooms price finishing ref")
      .populate("project","name location")
      .populate("agent","name phone whatsapp")
      .sort({ createdAt:-1 }).skip(skip).limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "ok", { reservations:items, total, page:Number(page), pages:Math.ceil(total/Number(limit)) });
});

// ── GET /reservations/stats (admin) ───────────────────────────────
export const getReservationStats = catchAsync(async (req, res) => {
  const [byStatus, byAgent, timeline, recent] = await Promise.all([
    Reservation.aggregate([{ $group:{ _id:"$status", count:{ $sum:1 } } }]),
    Reservation.aggregate([
      { $group:{ _id:"$agent", count:{ $sum:1 } } },
      { $lookup:{ from:"users", localField:"_id", foreignField:"_id", as:"agentInfo" } },
      { $unwind:{ path:"$agentInfo", preserveNullAndEmptyArrays:true } },
      { $project:{ name:"$agentInfo.name", count:1 } },
      { $sort:{ count:-1 } }, { $limit:10 },
    ]),
    Reservation.aggregate([
      { $group:{ _id:{ $dateToString:{ format:"%Y-%m", date:"$createdAt" } }, count:{ $sum:1 } } },
      { $sort:{ _id:1 } }, { $limit:12 },
    ]),
    Reservation.find()
      .populate("user","name phone")
      .populate("unit","type area price")
      .populate("project","name")
      .populate("agent","name")
      .sort({ createdAt:-1 }).limit(5),
  ]);
  const statusMap = {};
  byStatus.forEach(s => { statusMap[s._id]=s.count; });
  const total = Object.values(statusMap).reduce((a,b)=>a+b,0);
  sendSuccess(res, 200, "ok", { summary:{ total,...statusMap }, byAgent, timeline, recent });
});

// ── GET /reservations/assignment-logs (admin) ─────────────────────
export const getAssignmentLogs = catchAsync(async (req, res) => {
  const { page=1, limit=30 } = req.query;
  const skip = (Number(page)-1)*Number(limit);
  const [logs, total] = await Promise.all([
    AssignmentLog.find()
      .populate("user","name email phone")
      .populate("agent","name phone whatsapp")
      .populate("reservation","status createdAt")
      .sort({ createdAt:-1 }).skip(skip).limit(Number(limit)),
    AssignmentLog.countDocuments(),
  ]);
  sendSuccess(res, 200, "ok", { logs, total });
});
