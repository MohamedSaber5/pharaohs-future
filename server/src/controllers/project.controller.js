import Project from "../models/Project.model.js";
import Unit    from "../models/Unit.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError  from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// GET /projects
export const getAllProjects = catchAsync(async (req, res) => {
  const { status, search } = req.query;
  const filter = { isActive: true };
  if (status && status !== "الكل") filter.status = status;
  if (search) filter.name = { $regex: search, $options: "i" };

  const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();

  // Attach unit counts
  const ids = projects.map(p => p._id);
  const counts = await Unit.aggregate([
    { $match: { project: { $in: ids } } },
    { $group: { _id: "$project", total: { $sum: 1 }, available: { $sum: { $cond: [{ $eq: ["$status", "متاح"] }, 1, 0] }, }, sold: { $sum: { $cond: [{ $eq: ["$status", "مباع"] }, 1, 0] } } } }
  ]);
  const countMap = {};
  counts.forEach(c => { countMap[c._id.toString()] = c; });

  const result = projects.map(p => ({
    ...p,
    unitCount:     countMap[p._id.toString()]?.total     ?? 0,
    availableCount:countMap[p._id.toString()]?.available ?? 0,
    soldCount:     countMap[p._id.toString()]?.sold      ?? 0,
  }));

  sendSuccess(res, 200, "Projects retrieved", result);
});

// GET /projects/:id
export const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return next(new AppError("المشروع غير موجود", 404));

  const unitStats = await Unit.aggregate([
    { $match: { project: project._id } },
    { $group: { _id: null, total: { $sum: 1 }, available: { $sum: { $cond: [{ $eq: ["$status", "متاح"] }, 1, 0] } }, sold: { $sum: { $cond: [{ $eq: ["$status", "مباع"] }, 1, 0] } } } }
  ]);
  const stats = unitStats[0] || { total: 0, available: 0, sold: 0 };

  sendSuccess(res, 200, "Project retrieved", { ...project, unitStats: stats });
});

// POST /projects  (admin only)
export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);
  sendSuccess(res, 201, "تم إنشاء المشروع بنجاح", project);
});

// PATCH /projects/:id  (admin only)
export const updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  sendSuccess(res, 200, "تم تحديث المشروع", project);
});

// DELETE /projects/:id  (admin only)
export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  sendSuccess(res, 200, "تم حذف المشروع");
});

// GET /projects/stats  (admin only)
export const getProjectStats = catchAsync(async (req, res) => {
  const [projectStats, unitStats] = await Promise.all([
    Project.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Unit.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ])
  ]);

  const pMap = {}; projectStats.forEach(p => { pMap[p._id] = p.count; });
  const uMap = {}; unitStats.forEach(u => { uMap[u._id] = u.count; });

  sendSuccess(res, 200, "Stats retrieved", {
    projects: {
      total:        Object.values(pMap).reduce((a,b)=>a+b,0),
      underConstruction: pMap["تحت الإنشاء"] || 0,
      forSale:      pMap["قيد البيع"] || 0,
      completed:    pMap["مكتمل"] || 0,
    },
    units: {
      total:     Object.values(uMap).reduce((a,b)=>a+b,0),
      available: uMap["متاح"]   || 0,
      reserved:  uMap["محجوز"] || 0,
      sold:      uMap["مباع"]   || 0,
    }
  });
});
