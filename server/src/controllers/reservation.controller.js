import Reservation, { RESERVATION_STATUSES } from "../models/Reservation.model.js";
import Unit from "../models/Unit.model.js";
import User from "../models/User.model.js";
import AssignmentLog from "../models/AssignmentLog.model.js";
import Notification from "../models/Notification.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// Active statuses where unit is held / reserved
const ACTIVE = ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد"];

// Round-robin with priority rotation order and active availability filter
const assignAgent = async () => {
  const agents = await User.find({
    role: "employee",
    isActive: true,
    rotationActive: { $ne: false },
  })
    .sort({ rotationOrder: 1, assignedCount: 1, createdAt: 1 })
    .select("_id name phone whatsapp assignedCount");

  if (!agents.length) return null;
  const agent = agents[0];
  await User.findByIdAndUpdate(agent._id, { $inc: { assignedCount: 1 } });
  return agent;
};

// Helper: send notification safely
const notifyUser = async (userId, title, message, type = "reservation_status", reservationId = null) => {
  try {
    if (userId) {
      await Notification.create({
        recipient: userId,
        title,
        message,
        type,
        reservation: reservationId,
      });
    }
  } catch (err) {
    console.error("Failed to create notification:", err);
  }
};

// POST /reservations (user books a unit)
export const createReservation = catchAsync(async (req, res, next) => {
  const { unitId, notes } = req.body;

  const unit = await Unit.findById(unitId).populate("project", "name");
  if (!unit || !unit.isActive) return next(new AppError("الوحدة غير موجودة", 404));
  if (unit.status !== "متاح")
    return next(new AppError("هذه الوحدة غير متاحة للحجز حالياً", 400));

  // Limit: max 3 active reservations per client
  const activeCount = await Reservation.countDocuments({
    user: req.user._id,
    status: { $in: ACTIVE },
  });
  if (activeCount >= 3)
    return next(new AppError("لا يمكنك حجز أكثر من 3 وحدات نشطة في نفس الوقت", 400));

  // Check no active reservation for same unit
  const existing = await Reservation.findOne({ unit: unitId, status: { $in: ACTIVE } });
  if (existing) return next(new AppError("هذه الوحدة محجوزة بالفعل", 400));

  // Atomically lock unit status to prevent race conditions
  const lockedUnit = await Unit.findOneAndUpdate(
    { _id: unitId, status: "متاح", isActive: true },
    { status: "محجوز" },
    { new: true }
  ).populate("project", "name");

  if (!lockedUnit) {
    return next(new AppError("هذه الوحدة غير متاحة للحجز حالياً أو تم حجزها للتو", 400));
  }

  // Assign agent (round-robin)
  const agent = await assignAgent();

  let reservation;
  try {
    reservation = await Reservation.create({
      user: req.user._id,
      unit: unitId,
      project: lockedUnit.project?._id || lockedUnit.project,
      agent: agent?._id ?? null,
      notes: notes ?? "",
      statusHistory: [
        { status: "طلب حجز", changedBy: req.user._id, note: "تم إنشاء طلب الحجز" },
      ],
    });
  } catch (err) {
    // Rollback unit status if reservation fails
    await Unit.findByIdAndUpdate(unitId, { status: "متاح" });
    throw err;
  }

  // Log assignment
  if (agent) {
    await AssignmentLog.create({
      user: req.user._id,
      agent: agent._id,
      reservation: reservation._id,
      note: "تعيين تلقائي حسب نظام التناوب",
    });

    // Notify agent
    await notifyUser(
      agent._id,
      "حجز جديد تم تعيينه لك",
      `تم تعيين حجز جديد للعميل ${req.user.name} للوحدة في مشروع ${lockedUnit.project?.name || ""}.`,
      "assignment",
      reservation._id
    );
  }

  // Notify client
  await notifyUser(
    req.user._id,
    "تم استلام طلب حجزك",
    `تم استلام طلب حجزك بنجاح وسيتواصل معك مستشار المبيعات قريباً. صلاحية الحجز 7 أيام.`,
    "reservation_status",
    reservation._id
  );

  const populated = await reservation.populate([
    { path: "user", select: "name email phone" },
    { path: "unit", populate: { path: "project", select: "name location images" } },
    { path: "agent", select: "name phone whatsapp" },
  ]);

  sendSuccess(res, 201, "تم إرسال طلب الحجز بنجاح", populated);
});

// POST /reservations/agent-book (employee books for client)
export const agentBookForClient = catchAsync(async (req, res, next) => {
  const { unitId, clientPhone, clientName, notes } = req.body;
  if (!clientPhone || !clientName)
    return next(new AppError("رقم هاتف واسم العميل مطلوبان", 400));

  const cleanPhone = clientPhone.trim();
  const cleanName = clientName.trim();

  const unit = await Unit.findById(unitId).populate("project", "name");
  if (!unit || !unit.isActive) return next(new AppError("الوحدة غير موجودة", 404));
  if (unit.status !== "متاح")
    return next(new AppError("هذه الوحدة غير متاحة للحجز حالياً", 400));

  const existing = await Reservation.findOne({ unit: unitId, status: { $in: ACTIVE } });
  if (existing) return next(new AppError("هذه الوحدة محجوزة بالفعل", 400));

  // Find or create user for the client
  let clientUser = await User.findOne({
    $or: [{ phone: cleanPhone }, { email: `${cleanPhone}@pharaohsfuture.com` }],
  });
  if (!clientUser) {
    clientUser = await User.create({
      name: cleanName,
      email: `${cleanPhone}@pharaohsfuture.com`,
      password: Math.random().toString(36).slice(-10) + "A1!x",
      phone: cleanPhone,
      role: "user",
    });
  }

  // Atomically lock unit status
  const lockedUnit = await Unit.findOneAndUpdate(
    { _id: unitId, status: "متاح", isActive: true },
    { status: "محجوز" },
    { new: true }
  ).populate("project", "name");

  if (!lockedUnit) {
    return next(new AppError("هذه الوحدة غير متاحة للحجز حالياً أو تم حجزها للتو", 400));
  }

  let reservation;
  try {
    reservation = await Reservation.create({
      user: clientUser._id,
      unit: unitId,
      project: lockedUnit.project?._id || lockedUnit.project,
      agent: req.user._id,
      bookedByAgent: true,
      clientPhone: cleanPhone,
      notes: notes ?? "",
      statusHistory: [
        {
          status: "طلب حجز",
          changedBy: req.user._id,
          note: `حجز تم عبر موظف المبيعات للعميل ${cleanName}`,
        },
      ],
    });
  } catch (err) {
    await Unit.findByIdAndUpdate(unitId, { status: "متاح" });
    throw err;
  }

  await AssignmentLog.create({
    user: clientUser._id,
    agent: req.user._id,
    reservation: reservation._id,
    note: `حجز مباشر من الموظف للعميل ${cleanName}`,
  });

  await notifyUser(
    clientUser._id,
    "حجز وحدة عقارية جديد",
    `قام مستشار المبيعات بتسجيل حجز لك في مشروع ${lockedUnit.project?.name || ""}.`,
    "reservation_status",
    reservation._id
  );

  const populated = await reservation.populate([
    { path: "unit", populate: { path: "project", select: "name location" } },
    { path: "agent", select: "name phone whatsapp" },
  ]);
  sendSuccess(res, 201, "تم تسجيل الحجز باسم العميل", populated);
});

// GET /reservations/my (client reservations)
export const getMyReservations = catchAsync(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id })
    .populate("unit", "type area floor rooms price finishing status building")
    .populate("project", "name location images")
    .populate("agent", "name phone whatsapp")
    .sort({ createdAt: -1 });
  sendSuccess(res, 200, "ok", reservations);
});

// GET /reservations/assigned (employee sees own)
export const getAssignedReservations = catchAsync(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = { agent: req.user._id };
  if (status && status !== "الكل") filter.status = status;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Reservation.find(filter)
      .populate("user", "name email phone")
      .populate("unit", "type area floor rooms price finishing ref building status")
      .populate("project", "name location")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "ok", {
    reservations: items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

// PATCH /reservations/:id/status (employee or admin)
export const updateReservationStatus = catchAsync(async (req, res, next) => {
  const { status, agentNotes } = req.body;
  if (!RESERVATION_STATUSES.includes(status))
    return next(new AppError("حالة غير صالحة", 400));

  const reservation = await Reservation.findById(req.params.id).populate("unit");
  if (!reservation) return next(new AppError("الحجز غير موجود", 404));

  // Employee can only update their own assignments
  if (
    req.user.role === "employee" &&
    reservation.agent?.toString() !== req.user._id.toString()
  ) {
    return next(new AppError("غير مصرح لك بتعديل هذا الحجز", 403));
  }

  const prev = reservation.status;
  reservation.status = status;
  if (agentNotes !== undefined) reservation.agentNotes = agentNotes;

  reservation.statusHistory.push({
    status,
    changedBy: req.user._id,
    note: agentNotes || `تغيير الحالة إلى ${status}`,
    changedAt: new Date(),
  });

  if (status === "محجوز") reservation.confirmedAt = new Date();
  if (status === "مكتمل") {
    reservation.completedAt = new Date();
    await Unit.findByIdAndUpdate(reservation.unit._id, { status: "مباع" });
  }

  if (status === "ملغي" || status === "منتهي الصلاحية") {
    reservation.cancelledAt = new Date();
    // Return unit to market!
    if (reservation.unit) {
      await Unit.findByIdAndUpdate(reservation.unit._id, { status: "متاح" });
    }
  }

  await reservation.save();

  // Notify client of status change
  await notifyUser(
    reservation.user,
    `تحديث في حالة حجزك: ${status}`,
    `تم نقل حالة حجزك إلى "${status}". ${agentNotes ? `ملاحظة الموظف: ${agentNotes}` : ""}`,
    "reservation_status",
    reservation._id
  );

  sendSuccess(res, 200, "تم تحديث حالة الحجز بنجاح", reservation);
});

// POST /reservations/:id/cancel (Sales employee / Admin cancels reservation with reason)
export const cancelReservation = catchAsync(async (req, res, next) => {
  const { reason } = req.body;
  if (!reason || !reason.trim()) {
    return next(new AppError("يرجى كتابة سبب الإلغاء بدقة", 400));
  }

  const reservation = await Reservation.findById(req.params.id).populate("unit");
  if (!reservation) return next(new AppError("الحجز غير موجود", 404));

  if (
    req.user.role === "employee" &&
    reservation.agent?.toString() !== req.user._id.toString()
  ) {
    return next(new AppError("غير مصرح لك بإلغاء هذا الحجز", 403));
  }

  reservation.status = "ملغي";
  reservation.cancelledAt = new Date();
  reservation.agentNotes = reason;
  reservation.statusHistory.push({
    status: "ملغي",
    changedBy: req.user._id,
    note: `سبب الإلغاء: ${reason}`,
    changedAt: new Date(),
  });

  // Free unit immediately back to available!
  if (reservation.unit) {
    await Unit.findByIdAndUpdate(reservation.unit._id, { status: "متاح" });
  }

  await reservation.save();

  // Notify client
  await notifyUser(
    reservation.user,
    "تم إلغاء حجز الوحدة",
    `نود إعلامك بأنه تم إلغاء حجزك. سبب الإلغاء: ${reason}`,
    "reservation_status",
    reservation._id
  );

  sendSuccess(res, 200, "تم إلغاء الحجز وإعادة الوحدة للسوق بنجاح", reservation);
});

// GET /reservations (admin)
export const getAllReservations = catchAsync(async (req, res) => {
  const { status, project, agent, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status && status !== "الكل") filter.status = status;
  if (project) filter.project = project;
  if (agent) filter.agent = agent;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Reservation.find(filter)
      .populate("user", "name email phone")
      .populate("unit", "type area floor rooms price finishing ref building status")
      .populate("project", "name location")
      .populate("agent", "name phone whatsapp")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "ok", {
    reservations: items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

// GET /reservations/stats (admin)
export const getReservationStats = catchAsync(async (req, res) => {
  const [byStatus, byAgent, timeline, recent] = await Promise.all([
    Reservation.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Reservation.aggregate([
      { $group: { _id: "$agent", count: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "agentInfo" } },
      { $unwind: { path: "$agentInfo", preserveNullAndEmptyArrays: true } },
      { $project: { name: "$agentInfo.name", count: 1 } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
    Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]),
    Reservation.find()
      .populate("user", "name phone")
      .populate("unit", "type area price")
      .populate("project", "name")
      .populate("agent", "name")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);
  const statusMap = {};
  byStatus.forEach((s) => {
    statusMap[s._id] = s.count;
  });
  const total = Object.values(statusMap).reduce((a, b) => a + b, 0);
  sendSuccess(res, 200, "ok", {
    summary: { total, ...statusMap },
    byAgent,
    timeline,
    recent,
  });
});

// GET /reservations/assignment-logs (admin)
export const getAssignmentLogs = catchAsync(async (req, res) => {
  const { page = 1, limit = 30 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const [logs, total] = await Promise.all([
    AssignmentLog.find()
      .populate("user", "name email phone")
      .populate("agent", "name phone whatsapp")
      .populate("reservation", "status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    AssignmentLog.countDocuments(),
  ]);
  sendSuccess(res, 200, "ok", { logs, total });
});
