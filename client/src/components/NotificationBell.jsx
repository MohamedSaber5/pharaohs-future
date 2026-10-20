import { useState, useEffect, useRef } from "react";
import notificationService from "@services/notification.service.js";

const TYPE_ICON = {
  reservation_status: "notifications",
  assignment: "assignment_ind",
  reminder: "alarm",
  general: "info",
};

const TYPE_BG = {
  reservation_status: "bg-blue-100 text-blue-700",
  assignment: "bg-purple-100 text-purple-700",
  reminder: "bg-amber-100 text-amber-700",
  general: "bg-neutral-100 text-neutral-700",
};

export default function NotificationBell() {
  const [open, setOpen]                     = useState(false);
  const [notifications, setNotifications]   = useState([]);
  const [unreadCount, setUnreadCount]       = useState(0);
  const [loading, setLoading]               = useState(false);
  const panelRef = useRef(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getMy();
      const data = res?.data ?? res;
      setNotifications(data?.notifications ?? []);
      setUnreadCount(data?.unreadCount ?? 0);
    } catch (e) {
      console.error("Notification fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 60 seconds for new notifications
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (e) {
      console.error("Mark all read error:", e);
    }
  };

  const handleMarkOne = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (e) {
      console.error("Mark read error:", e);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
      >
        <span className="material-symbols-outlined text-[22px] text-white">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#000e1f]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[360px] bg-white rounded-3xl shadow-2xl border border-neutral-200/80 z-50 overflow-hidden"
          style={{ direction: "rtl" }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-neutral-900">الإشعارات</h3>
              {unreadCount > 0 && (
                <p className="text-[12px] text-neutral-400">{unreadCount} غير مقروء</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[12px] font-bold text-[#775a1a] hover:text-[#000e1f] transition-colors"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[360px] overflow-y-auto">
            {loading ? (
              <div className="p-6 flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-2xl bg-neutral-100 animate-pulse" />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-14 text-center">
                <span className="material-symbols-outlined text-[40px] text-neutral-300 mb-2">notifications_off</span>
                <p className="text-[13px] font-semibold text-neutral-400">لا توجد إشعارات بعد</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-50">
                {notifications.map((n) => (
                  <button
                    key={n._id}
                    onClick={() => { if (!n.isRead) handleMarkOne(n._id); }}
                    className={`w-full text-right px-5 py-4 flex items-start gap-3.5 transition-colors ${
                      n.isRead ? "bg-white hover:bg-neutral-50/70" : "bg-blue-50/50 hover:bg-blue-50"
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_BG[n.type] || TYPE_BG.general}`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {TYPE_ICON[n.type] || "info"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-[13px] leading-snug ${n.isRead ? "text-neutral-700 font-semibold" : "text-neutral-900 font-bold"}`}>
                          {n.title}
                        </p>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[12px] text-neutral-500 mt-0.5 leading-relaxed line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {new Date(n.createdAt).toLocaleString("ar-EG", {
                          month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-neutral-100 text-center">
              <span className="text-[12px] text-neutral-400">آخر 30 إشعار • تُحدَّث كل دقيقة</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
