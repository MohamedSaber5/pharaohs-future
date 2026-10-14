import Project from "../models/Project.model.js";
import Unit    from "../models/Unit.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError  from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// Helpers
const getBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const withUnitCounts = async (projects, req) => {
  const ids = projects.map(p => p._id);
  const counts = await Unit.aggregate([
    { $match: { project: { $in: ids }, isActive: true } },
    { $group: {
      _id:       "$project",
      total:     { $sum: 1 },
      available: { $sum: { $cond: [{ $eq: ["$status","متاح"]  }, 1, 0] } },
      sold:      { $sum: { $cond: [{ $eq: ["$status","مباع"]  }, 1, 0] } },
      reserved:  { $sum: { $cond: [{ $eq: ["$status","محجوز"] }, 1, 0] } },
    }}
  ]);
  const map = {};
  counts.forEach(c => { map[c._id.toString()] = c; });
  const base = getBaseUrl(req);
  return projects.map(p => ({
    ...p,
    images:         (p.images || []).map(img => img.startsWith("http") ? img : `${base}/${img}`),
    unitCount:      map[p._id.toString()]?.total     ?? 0,
    availableCount: map[p._id.toString()]?.available ?? 0,
    soldCount:      map[p._id.toString()]?.sold      ?? 0,
  }));
};

// GET /projects
export const getAllProjects = catchAsync(async (req, res) => {
  const { status, search, limit } = req.query;
  const filter = { isActive: true };
  if (status && status !== "الكل") filter.status = status;
  if (search) filter.$or = [
    { name:     { $regex: search, $options: "i" } },
    { location: { $regex: search, $options: "i" } },
    { type:     { $regex: search, $options: "i" } },
  ];
  const q = Project.find(filter).sort({ createdAt: -1 }).lean();
  if (limit) q.limit(Number(limit));
  const projects = await q;
  const result = await withUnitCounts(projects, req);
  sendSuccess(res, 200, "Projects retrieved", result);
});

// GET /projects/:id
export const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  const [result] = await withUnitCounts([project], req);
  sendSuccess(res, 200, "Project retrieved", result);
});

// POST /projects
export const createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);
  sendSuccess(res, 201, "تم إنشاء المشروع بنجاح", project);
});

// PATCH /projects/:id
export const updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  sendSuccess(res, 200, "تم تحديث المشروع", project);
});

// DELETE /projects/:id
export const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  sendSuccess(res, 200, "تم حذف المشروع");
});

// POST /projects/upload-images
export const uploadImages = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "لم يتم رفع أي صور" });
  }
  const base = getBaseUrl(req);
  const urls = req.files.map(f => `${base}/uploads/projects/${f.filename}`);
  sendSuccess(res, 200, "تم رفع الصور بنجاح", { urls });
});

// GET /projects/stats
export const getProjectStats = catchAsync(async (req, res) => {
  const [projectStats, unitStats] = await Promise.all([
    Project.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Unit.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ])
  ]);
  const pMap = {}; projectStats.forEach(p => { pMap[p._id] = p.count; });
  const uMap = {}; unitStats.forEach(u => { uMap[u._id] = u.count; });
  sendSuccess(res, 200, "Stats retrieved", {
    projects: {
      total:             Object.values(pMap).reduce((a,b)=>a+b,0),
      underConstruction: pMap["تحت الإنشاء"] || 0,
      forSale:           pMap["قيد البيع"]   || 0,
      completed:         pMap["مكتمل"]       || 0,
    },
    units: {
      total:    Object.values(uMap).reduce((a,b)=>a+b,0),
      available:uMap["متاح"]   || 0,
      reserved: uMap["محجوز"] || 0,
      sold:     uMap["مباع"]   || 0,
    }
  });
});
