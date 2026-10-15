import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError  from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// GET /api/v1/admin/users — list all users with search
export const getUsers = catchAsync(async (req, res) => {
  const { search, role, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role && role !== "all") filter.role = role;
  if (search) {
    filter.$or = [
      { name:  { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }
  const skip  = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).select("-__v").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);
  sendSuccess(res, 200, "Users fetched", { users, total, page: Number(page) });
});

// PATCH /api/v1/admin/users/:id/role — set user role
export const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!["user", "employee", "admin"].includes(role))
    return next(new AppError("دور غير صالح", 400));
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, ...(role !== "employee" ? { whatsapp: undefined, assignedCount: 0 } : {}) },
    { new: true, runValidators: true }
  ).select("-password -__v");
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, `تم تعيين دور ${role} بنجاح`, user);
});

// PATCH /api/v1/admin/users/:id/whatsapp — set employee whatsapp
export const updateUserWhatsapp = catchAsync(async (req, res, next) => {
  const { whatsapp } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { whatsapp }, { new: true }).select("-password");
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, "تم تحديث رقم واتساب الموظف", user);
});

// DELETE (deactivate) /api/v1/admin/users/:id
export const deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) return next(new AppError("المستخدم غير موجود", 404));
  sendSuccess(res, 200, "تم تعطيل الحساب");
});
