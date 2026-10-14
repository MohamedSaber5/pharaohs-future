import Reservation  from "../models/Reservation.model.js";
import Unit         from "../models/Unit.model.js";
import Project      from "../models/Project.model.js";
import catchAsync   from "../utils/catchAsync.js";
import AppError     from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// POST /reservations — create (user)
export const createReservation = catchAsync(async (req, res, next) => {
  const { unitId, notes } = req.body;

  const unit = await Unit.findById(unitId).populate("project");
  if (!unit)            return next(new AppError("الوحدة غير موجودة", 404));
  if (!unit.isActive)   return next(new AppError("الوحدة غير متاحة", 400));
  if (unit.status !== "متاح") {
    return next(new AppError("هذه الوحدة محجوزة أو مباعة بالفعل", 400));
  }

  // Check if user already has an active reservation for this unit
  const existing = await Reservation.findOne({
    user: req.user._id, unit: unitId, status: { $in: ["معلّق","مؤكد"] }
  });
  if (existing) return next(new AppError("لديك حجز مسبق على هذه الوحدة", 400));

  // Mark unit as reserved
  await Unit.findByIdAndUpdate(unitId, { status: "محجوز" });

  const reservation = await Reservation.create({
    user:    req.user._id,
    unit:    unitId,
    project: unit.project._id ?? unit.project,
    notes,
  });

  const populated = await reservation.populate([
    { path:"user",    select:"name email phone" },
    { path:"unit",    populate:{ path:"project", select:"name location images" } },
    { path:"project", select:"name location" },
  ]);

  sendSuccess(res, 201, "تم الحجز بنجاح — سيتواصل معك فريقنا خلال 24 ساعة", populated);
});

// GET /reservations/my — current user's reservations
export const getMyReservations = catchAsync(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id })
    .populate("unit", "type area floor rooms price finishing status")
    .populate("project", "name location images")
    .sort({ createdAt: -1 });
  sendSuccess(res, 200, "Reservations retrieved", reservations);
});

// GET /reservations — admin: all reservations
export const getAllReservations = catchAsync(async (req, res) => {
  const { status, project, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status)  filter.status  = status;
  if (project) filter.project = project;

  const skip = (Number(page)-1) * Number(limit);
  const [reservations, total] = await Promise.all([
    Reservation.find(filter)
      .populate("user",    "name email phone")
      .populate("unit",    "type area floor rooms price finishing ref")
      .populate("project", "name location")
      .sort({ createdAt: -1 })
      .skip(skip).limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "Reservations retrieved", {
    reservations, total, page:Number(page), pages:Math.ceil(total/Number(limit))
  });
});

// PATCH /reservations/:id/status — admin: update status
export const updateReservationStatus = catchAsync(async (req, res, next) => {
  const { status, adminNotes } = req.body;
  const reservation = await Reservation.findById(req.params.id).populate("unit");
  if (!reservation) return next(new AppError("الحجز غير موجود", 404));

  const prev = reservation.status;
  reservation.status     = status;
  reservation.adminNotes = adminNotes ?? reservation.adminNotes;
  if (status === "مؤكد")  reservation.confirmedAt = new Date();
  if (status === "ملغي")   reservation.cancelledAt = new Date();
  await reservation.save();

  // Update unit status accordingly
  if (status === "مكتمل") {
    await Unit.findByIdAndUpdate(reservation.unit._id, { status: "مباع" });
  } else if (status === "ملغي" && ["معلّق","مؤكد"].includes(prev)) {
    await Unit.findByIdAndUpdate(reservation.unit._id, { status: "متاح" });
  }

  sendSuccess(res, 200, "تم تحديث حالة الحجز", reservation);
});

// GET /reservations/stats — admin analytics
export const getReservationStats = catchAsync(async (req, res) => {
  const [byStatus, byProject, timeline, recent] = await Promise.all([
    Reservation.aggregate([
      { $group: { _id:"$status", count:{ $sum:1 } } }
    ]),
    Reservation.aggregate([
      { $group: { _id:"$project", count:{ $sum:1 } } },
      { $lookup:{ from:"projects", localField:"_id", foreignField:"_id", as:"projectInfo" } },
      { $unwind:"$projectInfo" },
      { $project:{ name:"$projectInfo.name", count:1 } },
      { $sort:{ count:-1 } },
      { $limit:5 },
    ]),
    Reservation.aggregate([
      { $group:{
        _id:{ $dateToString:{ format:"%Y-%m", date:"$createdAt" } },
        count:{ $sum:1 }
      }},
      { $sort:{ _id:1 } }, { $limit:12 }
    ]),
    Reservation.find()
      .populate("user","name email phone")
      .populate("unit","type area floor price")
      .populate("project","name location")
      .sort({ createdAt:-1 }).limit(5)
  ]);

  const statusMap = {};
  byStatus.forEach(s => { statusMap[s._id] = s.count; });

  sendSuccess(res, 200, "Stats retrieved", {
    summary: {
      total:     Object.values(statusMap).reduce((a,b)=>a+b,0),
      pending:   statusMap["معلّق"]  || 0,
      confirmed: statusMap["مؤكد"]  || 0,
      completed: statusMap["مكتمل"] || 0,
      cancelled: statusMap["ملغي"]   || 0,
    },
    byProject, timeline, recent,
  });
});
