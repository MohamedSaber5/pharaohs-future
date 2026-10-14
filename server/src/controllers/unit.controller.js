import Unit    from "../models/Unit.model.js";
import Project from "../models/Project.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError  from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllUnits = catchAsync(async (req, res) => {
  const { project, status, type, finishing } = req.query;
  const filter = { isActive: true };
  if (project)   filter.project   = project;
  if (status)    filter.status    = status;
  if (type)      filter.type      = { $regex: type, $options: "i" };
  if (finishing) filter.finishing = finishing;

  const units = await Unit.find(filter).populate("project", "name location").sort({ createdAt: -1 });
  sendSuccess(res, 200, "Units retrieved", units);
});

export const getUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findById(req.params.id).populate("project", "name location images");
  if (!unit) return next(new AppError("الوحدة غير موجودة", 404));
  sendSuccess(res, 200, "Unit retrieved", unit);
});

export const createUnit = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.body.project);
  if (!project) return next(new AppError("المشروع غير موجود", 404));
  const unit = await Unit.create(req.body);
  sendSuccess(res, 201, "تم إنشاء الوحدة بنجاح", unit);
});

export const updateUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!unit) return next(new AppError("الوحدة غير موجودة", 404));
  sendSuccess(res, 200, "تم تحديث الوحدة", unit);
});

export const deleteUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!unit) return next(new AppError("الوحدة غير موجودة", 404));
  sendSuccess(res, 200, "تم حذف الوحدة");
});
