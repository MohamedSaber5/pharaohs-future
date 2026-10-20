import cron from "node-cron";
import Reservation from "../models/Reservation.model.js";
import Unit from "../models/Unit.model.js";
import Notification from "../models/Notification.model.js";
import logger from "../utils/logger.js";

export const startExpiryCron = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const expired = await Reservation.find({
        status: { $in: ["طلب حجز", "قيد المراجعة"] },
        expiresAt: { $lt: new Date() },
      });
      if (!expired.length) return;
      const unitIds = expired.map((r) => r.unit).filter(Boolean);

      for (const res of expired) {
        await Reservation.findByIdAndUpdate(res._id, {
          status: "منتهي الصلاحية",
          cancelledAt: new Date(),
          $push: {
            statusHistory: {
              status: "منتهي الصلاحية",
              note: "انتهت مدة الحجز التلقائية (7 أيام دون إتمام التعاقد)",
              changedAt: new Date(),
            },
          },
        });

        // Notify client
        if (res.user) {
          await Notification.create({
            recipient: res.user,
            title: "انتهاء صلاحية الحجز",
            message: "انتهت مهلة الحجز المحددة (7 أيام) وتمت إعادة الوحدة لقائمة الوحدات المتاحة.",
            type: "reminder",
            reservation: res._id,
          });
        }
      }

      await Unit.updateMany({ _id: { $in: unitIds } }, { status: "متاح" });
      logger.info(`Auto-expired ${expired.length} reservations and freed units to 'متاح'`);
    } catch (err) {
      logger.error("Expiry cron error: " + err.message);
    }
  });
  logger.info("Reservation expiry cron started (runs every hour)");
};
