import cron from "node-cron";
import Reservation from "../models/Reservation.model.js";
import Unit        from "../models/Unit.model.js";
import logger      from "../utils/logger.js";

export const startExpiryCron = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const expired = await Reservation.find({
        status:    { $in: ["طلب حجز","قيد المراجعة"] },
        expiresAt: { $lt: new Date() },
      });
      if (!expired.length) return;
      const unitIds = expired.map(r => r.unit);
      await Reservation.updateMany(
        { _id: { $in: expired.map(r=>r._id) } },
        {
          $set:  { status:"منتهي الصلاحية", cancelledAt: new Date() },
          $push: { statusHistory:{ status:"منتهي الصلاحية", note:"انتهت مدة الحجز تلقائياً (7 أيام)" } }
        }
      );
      await Unit.updateMany({ _id: { $in: unitIds } }, { status: "متاح" });
      logger.info(`Auto-expired ${expired.length} reservations`);
    } catch (err) {
      logger.error("Expiry cron error: " + err.message);
    }
  });
  logger.info("Reservation expiry cron started (runs every hour)");
};
