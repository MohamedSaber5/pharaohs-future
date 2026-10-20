import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reservationService from "@services/reservation.service.js";

// Reservation Stages in Order
const STAGES = ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد", "مكتمل"];

const STATUS_CONFIG = {
  "طلب حجز":       { badge: "bg-blue-100 text-blue-800 border-blue-200",     icon: "pending_actions", step: 0 },
  "قيد المراجعة":  { badge: "bg-amber-100 text-amber-800 border-amber-200",   icon: "schedule",        step: 1 },
  "محجوز":         { badge: "bg-purple-100 text-purple-800 border-purple-200", icon: "check_circle",    step: 2 },
  "جاهز للتعاقد":  { badge: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: "draw",            step: 3 },
  "مكتمل":         { badge: "bg-green-100 text-green-800 border-green-200",   icon: "verified",        step: 4 },
  "ملغي":          { badge: "bg-red-100 text-red-800 border-red-200",         icon: "cancel",          step: -1 },
  "منتهي الصلاحية": { badge: "bg-gray-200 text-gray-700 border-gray-300",     icon: "timer_off",       step: -1 },
};

// Helper: Calculate remaining time until 7-day expiration
function formatRemainingTime(expiresAt, createdAt, status) {
  if (status === "مكتمل") return { text: "تم التعاقد بنجاح", isExpired: false, isCompleted: true };
  if (status === "ملغي") return { text: "تم إلغاء الحجز", isExpired: true, isCancelled: true };
  if (status === "منتهي الصلاحية") return { text: "انتهت مهلة الحجز", isExpired: true };

  const targetDate = expiresAt ? new Date(expiresAt) : new Date(new Date(createdAt).getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = targetDate - now;

  if (diffMs <= 0) {
    return { text: "انتهت مهلة الحجز (7 أيام)", isExpired: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return { text: `متبقي ${days} يوم و ${hours} ساعة`, isExpired: false, days, hours };
  }
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return { text: `متبقي ${hours} ساعة و ${minutes} دقيقة`, isExpired: false, hours, minutes };
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");

  const loadReservations = () => {
    setLoading(true);
    reservationService.getMy()
      .then((res) => {
        const list = res?.data ?? res ?? [];
        setReservations(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error(err);
        setError("تعذّر تحميل قائمة الحجوزات");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#000e1f] text-white pt-32 pb-14 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#c9952a]">bookmark</span>
            <span className="text-[13px] font-semibold text-[#c9952a]">بوابة العميل</span>
          </div>
          <h1 className="text-[30px] md:text-[38px] font-bold">حجوزاتي العقارية</h1>
          <p className="text-white/60 text-[14px] mt-1">
            تابع حالة كل حجز، والوقت المتبقي لإنهاء الإجراءات، وتواصل مع مستشار المبيعات المخصص لك.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-[14px] mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-white rounded-3xl border border-neutral-100 animate-pulse" />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-16 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[40px] text-neutral-400">home_work</span>
            </div>
            <h3 className="text-[20px] font-bold text-neutral-800 mb-2">لا توجد لديك أي حجوزات حالياً</h3>
            <p className="text-[14px] text-neutral-500 max-w-md mx-auto mb-6">
              تصفّح المشاريع والوحدات العقارية المتاحة في أسوان واحجز وحدتك المفضلة الآن بخطوات بسيطة.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-white text-[14px] shadow-md hover:opacity-90 transition-all"
              style={{ background: "#000e1f" }}
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              تصفح الوحدات المتاحة
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {reservations.map((r) => {
              const u = r.unit;
              const p = r.project;
              const cfg = STATUS_CONFIG[r.status] || STATUS_CONFIG["طلب حجز"];
              const timeInfo = formatRemainingTime(r.expiresAt, r.createdAt, r.status);
              const isTerminal = r.status === "ملغي" || r.status === "منتهي الصلاحية";

              return (
                <div
                  key={r._id}
                  className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Top Bar with Status and Countdown */}
                  <div className="px-6 py-4 bg-neutral-50/80 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-[12px] font-bold border flex items-center gap-1.5 ${cfg.badge}`}>
                        <span className="material-symbols-outlined text-[16px]">{cfg.icon}</span>
                        {r.status}
                      </span>

                      {/* Remaining Time Badge */}
                      <span
                        className={`px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 ${
                          timeInfo.isExpired
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : timeInfo.isCompleted
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {timeInfo.isExpired ? "timer_off" : timeInfo.isCompleted ? "task_alt" : "hourglass_top"}
                        </span>
                        {timeInfo.text}
                      </span>
                    </div>

                    <div className="text-[12px] text-neutral-400 font-medium">
                      تاريخ الحجز: {new Date(r.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  </div>

                  {/* Stage Progress Tracker (Active stages) */}
                  {!isTerminal && (
                    <div className="px-6 py-5 bg-white border-b border-neutral-100">
                      <p className="text-[12px] font-bold text-neutral-400 mb-3">مسار تقدم الحجز:</p>
                      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 -translate-y-1/2 z-0" />
                        <div
                          className="absolute top-1/2 right-0 h-1 bg-[#775a1a] -translate-y-1/2 z-0 transition-all duration-500"
                          style={{
                            width: `${(Math.max(0, cfg.step) / (STAGES.length - 1)) * 100}%`,
                          }}
                        />

                        {STAGES.map((stage, idx) => {
                          const isDone = idx <= cfg.step;
                          const isCurrent = idx === cfg.step;
                          return (
                            <div key={stage} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                                  isCurrent
                                    ? "bg-[#000e1f] text-[#c9952a] ring-4 ring-[#c9952a]/20"
                                    : isDone
                                    ? "bg-[#775a1a] text-white"
                                    : "bg-white border-2 border-neutral-300 text-neutral-400"
                                }`}
                              >
                                {isDone && !isCurrent ? (
                                  <span className="material-symbols-outlined text-[16px]">check</span>
                                ) : (
                                  idx + 1
                                )}
                              </div>
                              <span
                                className={`text-[11px] font-bold mt-1.5 whitespace-nowrap ${
                                  isCurrent ? "text-[#000e1f]" : isDone ? "text-neutral-700" : "text-neutral-400"
                                }`}
                              >
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Body Details */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Unit Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#775a1a]/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[28px] text-[#775a1a]">apartment</span>
                        </div>
                        <div>
                          <h3 className="text-[18px] font-bold text-neutral-900 mb-1">
                            {u?.type || "وحدة سكنية"} — {u?.area} م²
                          </h3>
                          <p className="text-[13px] text-neutral-500">
                            {p?.name} • {p?.location || "أسوان"} {u?.building ? `• ${u.building}` : ""}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-[12px] text-neutral-600">
                            <span className="bg-neutral-100 px-2.5 py-1 rounded-lg">الدور: {u?.floor === 0 ? "أرضي" : u?.floor || 1}</span>
                            <span className="bg-neutral-100 px-2.5 py-1 rounded-lg">{u?.rooms || 1} غرف</span>
                            <span className="bg-neutral-100 px-2.5 py-1 rounded-lg">{u?.finishing || "تشطيب سوبر لوكس"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes / History */}
                      {r.agentNotes && (
                        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-[13px] text-amber-900">
                          <span className="font-bold flex items-center gap-1.5 mb-1">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            ملاحظة من مستشار المبيعات:
                          </span>
                          <p>{r.agentNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Price and Agent Contact */}
                    <div className="border-t md:border-t-0 md:border-r md:pr-6 border-neutral-100 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] text-neutral-400 font-semibold mb-0.5">إجمالي قيمة الوحدة</p>
                        <p className="text-[22px] font-black text-neutral-900">
                          {u?.price ? Number(u.price).toLocaleString() : "—"}
                          <span className="text-[12px] font-normal text-neutral-400 mr-1">ج.م</span>
                        </p>
                      </div>

                      {/* Assigned Agent Box */}
                      {r.agent ? (
                        <div className="mt-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                          <p className="text-[11px] font-bold text-neutral-400 mb-1">مستشار المبيعات المخصص:</p>
                          <p className="text-[13px] font-bold text-neutral-800">{r.agent.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {r.agent.whatsapp && (
                              <a
                                href={`https://wa.me/${r.agent.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`مرحباً، بخصوص حجزي للوحدة رقم (${u?.type || ""})`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                              >
                                <span className="material-symbols-outlined text-[15px]">chat</span>
                                واتساب
                              </a>
                            )}
                            {r.agent.phone && (
                              <a
                                href={`tel:${r.agent.phone}`}
                                className="flex-1 h-8 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                              >
                                <span className="material-symbols-outlined text-[15px]">call</span>
                                اتصال
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-[12px] text-neutral-500 text-center">
                          جاري تعيين مستشار مبيعات لك...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
