import Notification from "../models/Notification.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";

// GET /api/v1/notifications/my
export const getMyNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30)
    .populate({
      path: "reservation",
      select: "status unit project",
      populate: [
        { path: "unit", select: "type area price" },
        { path: "project", select: "name" },
      ],
    });

  const unreadCount = await Notification.countDocuments({
    recipient: req.user._id,
    isRead: false,
  });

  sendSuccess(res, 200, "Notifications retrieved", {
    notifications,
    unreadCount,
  });
});

// PATCH /api/v1/notifications/:id/read
export const markAsRead = catchAsync(async (req, res, next) => {
  const notif = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notif) return next(new AppError("الإشعار غير موجود", 404));
  sendSuccess(res, 200, "تم تحديد الإشعار كمقروء", notif);
});

// PATCH /api/v1/notifications/read-all
export const markAllAsRead = catchAsync(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true }
  );
  sendSuccess(res, 200, "تم تحديد جميع الإشعارات كمقروءة");
});
