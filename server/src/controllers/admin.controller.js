import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError  from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import escapeRegex from "../utils/escapeRegex.js";

// GET /api/v1/admin/users - list all users with search
export const getUsers = catchAsync(async (req, res) => {
  const { search, role, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role && role !== "all") filter.role = role;
  if (search) {
    const safeSearch = escapeRegex(search.trim());
    filter.$or = [
      { name:  { $regex: safeSearch, $options: "i" } },
      { email: { $regex: safeSearch, $options: "i" } },
      { phone: { $regex: safeSearch, $options: "i" } },
    ];
  }
  const skip  = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).select("-__v").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "Users fetched", { users, total, page: Number(page) });
});

// PATCH /api/v1/admin/users/:id/role - set user role
export const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!["user", "employee", "admin"].includes(role))
    return next(new AppError("دور غير صالح", 400));

  if (req.params.id === req.user._id.toString() && role !== "admin") {
    return next(new AppError("لا يمكنك تخفيض صلاحيات حسابك الخاص كمسؤول", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, ...(role !== "employee" ? { whatsapp: undefined, assignedCount: 0 } : {}) },
    { new: true, runValidators: true }
  ).select("-password -__v");
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, `تم تغيير الدور إلى ${role} بنجاح`, user);
});

// PATCH /api/v1/admin/users/:id/whatsapp - set employee whatsapp
export const updateUserWhatsapp = catchAsync(async (req, res, next) => {
  const { whatsapp } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { whatsapp }, { new: true }).select("-password");
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, "تم تحديث رقم الواتساب بنجاح", user);
});

// DELETE (deactivate) /api/v1/admin/users/:id
export const deactivateUser = catchAsync(async (req, res, next) => {
  if (req.params.id === req.user._id.toString()) {
    return next(new AppError("لا يمكنك إلغاء تنشيط حسابك الخاص", 400));
  }
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false, rotationActive: false }, { new: true });
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, "تم إلغاء تنشيط المستخدم");
});

// --- Employee Rotation Management ---

// GET /api/v1/admin/employees/rotation - list employees in rotation
export const getEmployeesRotation = catchAsync(async (req, res) => {
  const employees = await User.find({ role: "employee" })
    .select("name email phone whatsapp isActive rotationActive rotationOrder assignedCount")
    .sort({ rotationOrder: 1, createdAt: 1 });
  sendSuccess(res, 200, "قائمة الموظفين في دورة التعيين", employees);
});

// PATCH /api/v1/admin/employees/:id/rotation - toggle active or change order
export const updateEmployeeRotation = catchAsync(async (req, res, next) => {
  const { rotationActive, rotationOrder } = req.body;
  const updates = {};
  if (typeof rotationActive === "boolean") updates.rotationActive = rotationActive;
  if (typeof rotationOrder === "number")   updates.rotationOrder  = rotationOrder;

  const employee = await User.findOneAndUpdate(
    { _id: req.params.id, role: "employee" },
    updates,
    { new: true }
  ).select("-password");

  if (!employee) return next(new AppError("الموظف غير موجود", 404));
  sendSuccess(res, 200, "تم تحديث حالة الموظف في التناوب", employee);
});

// POST /api/v1/admin/employees/rotation/reorder - bulk reorder
export const reorderEmployeesRotation = catchAsync(async (req, res, next) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds))
    return next(new AppError("يجب تقديم مصفوفة بالمعرفات المرتبة", 400));

  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id, role: "employee" },
      update: { rotationOrder: index },
    },
  }));

  if (bulkOps.length > 0) {
    await User.bulkWrite(bulkOps);
  }

  const updated = await User.find({ role: "employee" })
    .select("name email phone whatsapp isActive rotationActive rotationOrder assignedCount")
    .sort({ rotationOrder: 1, createdAt: 1 });

  sendSuccess(res, 200, "تم إعادة ترتيب موظفي المبيعات بنجاح", updated);
});
