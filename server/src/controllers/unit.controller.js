import Unit from "../models/Unit.model.js";
import Project from "../models/Project.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import escapeRegex from "../utils/escapeRegex.js";

const getBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

// Helper to keep project's totalUnits field in sync with active units
const syncProjectUnitsCount = async (projectId) => {
  if (!projectId) return;
  try {
    const count = await Unit.countDocuments({ project: projectId, isActive: true });
    await Project.findByIdAndUpdate(projectId, { totalUnits: count });
  } catch (err) {
    console.error("Error syncing project unit count:", err);
  }
};

export const getAllUnits = catchAsync(async (req, res) => {
  const {
    project,
    status = "متاح",
    type,
    finishing,
    building,
    floor,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    rooms,
    sortBy = "createdAt",
    sortDir = "desc",
    page = 1,
    limit = 12,
  } = req.query;

  const filter = { isActive: true };

  // Only show available units by default (AC2)
  if (status === "all" || status === "الكل") {
    /* admin view - no status filter */
  } else {
    filter.status = status || "متاح";
  }

  if (project) filter.project = project;
  if (type) filter.type = { $regex: escapeRegex(type.trim()), $options: "i" };
  if (finishing) filter.finishing = finishing;
  if (building) filter.building = { $regex: escapeRegex(building.trim()), $options: "i" };
  if (floor) filter.floor = Number(floor);
  if (rooms) filter.rooms = Number(rooms);

  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  // Area range
  if (minArea || maxArea) {
    filter.area = {};
    if (minArea) filter.area.$gte = Number(minArea);
    if (maxArea) filter.area.$lte = Number(maxArea);
  }

  const sortObj = {};
  sortObj[sortBy] = sortDir === "asc" ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);
  const [units, total] = await Promise.all([
    Unit.find(filter)
      .populate("project", "name location images")
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit)),
    Unit.countDocuments(filter),
  ]);

  sendSuccess(res, 200, "Units retrieved", {
    units,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

export const getUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id).populate(
    "project",
    "name location images"
  );
  if (!unit) return next(new AppError("الوحدة غير موجودة", 404));
  sendSuccess(res, 200, "Unit retrieved", unit);
});

export const createUnit = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.body.project);
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  const unit = await Unit.create(req.body);

  // Dynamically sync project's totalUnits in MongoDB
  await syncProjectUnitsCount(project._id);

  sendSuccess(res, 201, "تم إنشاء الوحدة بنجاح", unit);
});

export const updateUnit = catchAsync(async (req, res, next) => {
  const oldUnit = await Unit.findById(req.params.id);
  if (!oldUnit) return next(new AppError("الوحدة غير موجودة", 404));

  const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Sync projects if changed or active status changed
  if (unit.project) await syncProjectUnitsCount(unit.project);
  if (oldUnit.project && oldUnit.project.toString() !== unit.project?.toString()) {
    await syncProjectUnitsCount(oldUnit.project);
  }

  sendSuccess(res, 200, "تم تحديث الوحدة", unit);
});

export const deleteUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!unit) return next(new AppError("الوحدة غير موجودة", 404));

  // Dynamically sync project's totalUnits in MongoDB on delete
  if (unit.project) {
    await syncProjectUnitsCount(unit.project);
  }

  sendSuccess(res, 200, "تم حذف الوحدة");
});

// POST /units/upload-images
export const uploadUnitImagesController = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "لم يتم رفع أي صور" });
  }
  const base = getBaseUrl(req);
  const paths = req.files.map((f) => `/uploads/units/${f.filename}`);
  const fullUrls = req.files.map((f) => `${base}/uploads/units/${f.filename}`);
  sendSuccess(res, 200, "تم رفع الصور بنجاح", { urls: paths, fullUrls });
});
