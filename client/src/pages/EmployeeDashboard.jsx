import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import reservationService from "@services/reservation.service.js";
import { useAuth } from "@context/AuthContext.jsx";
import { useLanguage } from "@context/LanguageContext.jsx";
import { PyramidIcon, ScarabIcon, PharaohPatternBackground } from "@components/ui/PharaohIcons.jsx";
import LanguageSwitcher from "@components/common/LanguageSwitcher.jsx";

const STAGES = ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد", "مكتمل", "ملغي"];

const STAGE_STYLES = {
  "طلب حجز": {
    badge: "bg-blue-50 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
    icon: "hourglass_top",
  },
  "قيد المراجعة": {
    badge: "bg-amber-50 text-amber-900 border-amber-300",
    dot: "bg-amber-500",
    icon: "pending_actions",
  },
  "محجوز": {
    badge: "bg-purple-50 text-purple-900 border-purple-300",
    dot: "bg-purple-600",
    icon: "bookmark",
  },
  "جاهز للتعاقد": {
    badge: "bg-indigo-50 text-indigo-900 border-indigo-300",
    dot: "bg-indigo-600",
    icon: "contract",
  },
  "مكتمل": {
    badge: "bg-emerald-50 text-emerald-900 border-emerald-300",
    dot: "bg-emerald-600",
    icon: "check_circle",
  },
  "ملغي": {
    badge: "bg-rose-50 text-rose-900 border-rose-300",
    dot: "bg-rose-500",
    icon: "cancel",
  },
  "منتهي الصلاحية": {
    badge: "bg-neutral-100 text-neutral-800 border-neutral-300",
    dot: "bg-neutral-400",
    icon: "history",
  },
};

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { t, isRTL, dir } = useLanguage();

  const [items, setItems]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("الكل");
  const [page, setPage]         = useState(1);
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  // Update Status Modal
  const [editItem, setEditItem]   = useState(null);
  const [newStatus, setNewStatus] = useState("قيد المراجعة");
  const [note, setNote]           = useState("");
  const [updating, setUpdating]   = useState(false);

  // Dedicated Cancel Modal
  const [cancelItem, setCancelItem]     = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling]     = useState(false);

  // Agent Book Modal
  const [showBook, setShowBook] = useState(false);
  const [bookForm, setBookForm] = useState({ unitId: "", clientName: "", clientPhone: "", notes: "" });
  const [booking, setBooking]   = useState(false);

  const loadAssigned = useCallback(async () => {
    setLoading(true);
    try {
      const res = await reservationService.getAssigned({
        status: filter !== "الكل" ? filter : undefined,
        page,
        limit: 20,
      });
      const data = res?.data ?? res;
      setItems(data?.reservations ?? []);
      setTotal(data?.total ?? 0);
    } catch (e) {
      console.error(e);
      setAlertMsg({ type: "error", text: "تعذّر تحميل قائمة الحجوزات، يرجى المحاولة لاحقاً" });
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    loadAssigned();
  }, [loadAssigned]);

  // Handle stage transition
  const handleUpdate = async () => {
    if (!editItem) return;
    setUpdating(true);
    try {
      await reservationService.updateStatus(editItem._id, {
        status: newStatus,
        agentNotes: note,
      });
      setAlertMsg({ type: "success", text: `تم تحديث مرحلة الحجز إلى "${newStatus}" بنجاح` });
      setEditItem(null);
      loadAssigned();
    } catch (e) {
      setAlertMsg({ type: "error", text: e.response?.data?.message || "فشل تحديث المرحلة" });
    } finally {
      setUpdating(false);
    }
  };

  // Handle Cancellation with mandatory reason
  const handleCancel = async () => {
    if (!cancelItem) return;
    if (!cancelReason.trim()) {
      setAlertMsg({ type: "error", text: "يرجى كتابة سبب الإلغاء بدقة لتسجيله وتفريغ الوحدة فوراً" });
      return;
    }
    setCancelling(true);
    try {
      await reservationService.cancel(cancelItem._id, cancelReason);
      setAlertMsg({
        type: "success",
        text: "تم إلغاء الحجز بنجاح وإعادة الوحدة فوراً لقائمة الوحدات المتاحة للجمهور",
      });
      setCancelItem(null);
      setCancelReason("");
      loadAssigned();
    } catch (e) {
      setAlertMsg({ type: "error", text: e.response?.data?.message || "فشل إلغاء الحجز" });
    } finally {
      setCancelling(false);
    }
  };

  // Handle direct booking
  const handleAgentBook = async () => {
    if (!bookForm.unitId || !bookForm.clientName || !bookForm.clientPhone) {
      setAlertMsg({ type: "error", text: "يرجى تعبئة الحقول الإلزامية (*)" });
      return;
    }
    const cleanPhone = bookForm.clientPhone.trim();
    if (cleanPhone.length !== 11 || !/^(010|011|012|015)\d{8}$/.test(cleanPhone)) {
      setAlertMsg({
        type: "error",
        text: "رقم هاتف العميل يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)",
      });
      return;
    }
    setBooking(true);
    try {
      await reservationService.agentBook(bookForm);
      setAlertMsg({ type: "success", text: "تم تسجيل الحجز بنجاح باسم العميل وتحديث السجل" });
      setShowBook(false);
      setBookForm({ unitId: "", clientName: "", clientPhone: "", notes: "" });
      loadAssigned();
    } catch (e) {
      setAlertMsg({ type: "error", text: e.response?.data?.message || "فشل الحجز" });
    } finally {
      setBooking(false);
    }
  };

  // Stats Counters
  const counts = {
    pending: items.filter((i) => i.status === "طلب حجز").length,
    review: items.filter((i) => i.status === "قيد المراجعة").length,
    reserved: items.filter((i) => i.status === "محجوز").length,
    completed: items.filter((i) => i.status === "مكتمل").length,
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-neutral-900" dir={dir}>
      
      {/* ── 1. PHARAONIC EXECUTIVE HEADER ── */}
      <div className="relative bg-[#000e1f] text-white pt-28 pb-16 px-6 lg:px-12 overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />
        
        {/* Ambient royal glow orbs */}
        <div className={`absolute top-0 ${isRTL ? "right-1/4" : "left-1/4"} w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 ${isRTL ? "left-10" : "right-10"} w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none`} />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            {/* Pharaonic Royal Cartouche Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-3 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm">
              <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
              <span className="text-xs font-bold text-[#f0d897] tracking-wider">
                {isRTL ? "منظومة مبيعات الفراعنة — لوحة تحكم المستشار العقاري" : "Pharaohs Sales Portal — Real Estate Consultant Dashboard"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              {t("employee.dashboardTitle", "إدارة حجوزات العملاء والتعاقدات")}
            </h1>
            <p className="text-white/80 text-sm mt-1.5 max-w-2xl leading-relaxed">
              {isRTL ? (
                <>أهلاً بك، <span className="text-[#f0d897] font-bold">{user?.name || "المستشار العقاري"}</span>. تابع العملاء المحالين إليك، وقم بتحديث مراحل التفاوض والتعاقد أو الحجز المباشر.</>
              ) : (
                <>Welcome, <span className="text-[#f0d897] font-bold">{user?.name || "Sales Consultant"}</span>. Manage assigned client leads, update negotiation stages, or register direct bookings.</>
              )}
            </p>
          </div>

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <LanguageSwitcher variant="button" />

            <Link
              to="/"
              className="h-12 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px]">home</span>
              <span>{t("employee.backToHome", "العودة للرئيسية")}</span>
            </Link>

            <button
              onClick={() => setShowBook(true)}
              className="h-12 px-6 rounded-2xl font-bold text-xs sm:text-sm text-[#000e1f] flex items-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-[#c9952a]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)" }}
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>{isRTL ? "حجز وحدة جديدة لعميل" : "New Client Booking"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        
        {/* ── 2. ALERT NOTIFICATION ── */}
        {alertMsg.text && (
          <div
            className={`p-4 rounded-2xl text-sm font-bold mb-6 flex items-center justify-between shadow-sm border ${
              alertMsg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                : "bg-rose-50 text-rose-900 border-rose-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">
                {alertMsg.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{alertMsg.text}</span>
            </div>
            <button
              onClick={() => setAlertMsg({ type: "", text: "" })}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* ── 3. WORKLOAD KPI STATS CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            {
              label: "طلبات حجز جديدة",
              val: counts.pending,
              icon: "notification_important",
              badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
              accent: "from-blue-500/10 to-transparent",
              color: "text-blue-700",
            },
            {
              label: "قيد المراجعة والتواصل",
              val: counts.review,
              icon: "support_agent",
              badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
              accent: "from-amber-500/10 to-transparent",
              color: "text-amber-700",
            },
            {
              label: "وحدات محجوزة رسمياً",
              val: counts.reserved,
              icon: "lock_clock",
              badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
              accent: "from-purple-500/10 to-transparent",
              color: "text-purple-700",
            },
            {
              label: "تعاقدات مكتملة بنجاح",
              val: counts.completed,
              icon: "verified",
              badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
              accent: "from-emerald-500/10 to-transparent",
              color: "text-emerald-700",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="relative overflow-hidden bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-28 h-28 rounded-full bg-gradient-to-br ${card.accent} blur-xl pointer-events-none`} />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-neutral-600">{card.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.badgeBg}`}>
                  <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${card.color}`}>
                  {card.val}
                </span>
                <span className="text-xs font-semibold text-neutral-500">حجز</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. STAGE FILTER TABS ── */}
        <div className="bg-white p-3 rounded-2xl border border-neutral-200/90 shadow-sm mb-6 flex items-center gap-2 overflow-x-auto">
          {["الكل", ...STAGES].map((s) => {
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => { setFilter(s); setPage(1); }}
                className={`h-10 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#000e1f] text-white shadow-md shadow-[#000e1f]/20"
                    : "text-neutral-700 hover:bg-neutral-100/80"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a]" />}
                {s}
              </button>
            );
          })}
        </div>

        {/* ── 5. RESERVATIONS TABLE ── */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden">
          
          {/* Header inside card */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#c9952a] text-[22px]">assignment</span>
              <div>
                <h2 className="text-base font-extrabold text-neutral-900">قائمة الحجوزات والتعاملات</h2>
                <p className="text-xs text-neutral-500">إجمالي الحجوزات المسجلة: {total} حجز</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-neutral-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 px-6 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#000e1f]/5 flex items-center justify-center text-neutral-400 mb-3">
                <span className="material-symbols-outlined text-[36px]">assignment_late</span>
              </div>
              <h3 className="text-base font-bold text-neutral-800 mb-1">لا توجد حجوزات ضمن هذا التصنيف</h3>
              <p className="text-xs text-neutral-500">يمكنك تسجيل حجز جديد أو اختيار تصنيف مختلف من الأعلى</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-[#000e1f]/5 border-b border-neutral-200 text-neutral-700 text-xs font-black">
                  <tr>
                    <th className="px-6 py-4">بيانات العميل</th>
                    <th className="px-6 py-4">رقم الهاتف</th>
                    <th className="px-6 py-4">المشروع العقاري</th>
                    <th className="px-6 py-4">تفاصيل الوحدة</th>
                    <th className="px-6 py-4">السعر الإجمالي</th>
                    <th className="px-6 py-4">المرحلة الحالية</th>
                    <th className="px-6 py-4">تاريخ الحجز</th>
                    <th className="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {items.map((r) => {
                    const u = r.unit;
                    const isClosed = r.status === "ملغي" || r.status === "مكتمل" || r.status === "منتهي الصلاحية";
                    const stageConfig = STAGE_STYLES[r.status] || STAGE_STYLES["قيد المراجعة"];

                    return (
                      <tr key={r._id} className="hover:bg-neutral-50/80 transition-colors">
                        
                        {/* Client info */}
                        <td className="px-6 py-4">
                          <p className="font-extrabold text-neutral-900 leading-tight">
                            {r.user?.name || r.clientPhone || "عميل مميز"}
                          </p>
                          <p className="text-xs text-neutral-500 font-mono mt-0.5">{r.user?.email || "—"}</p>
                          {r.bookedByAgent && (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md font-bold mt-1">
                              <span className="material-symbols-outlined text-[12px]">support_agent</span>
                              حجز موظف
                            </span>
                          )}
                        </td>

                        {/* Phone */}
                        <td className="px-6 py-4 font-mono font-bold text-neutral-800 text-xs" dir="ltr">
                          {r.user?.phone || r.clientPhone || "—"}
                        </td>

                        {/* Project */}
                        <td className="px-6 py-4 font-extrabold text-[#000e1f]">
                          {r.project?.name || "مشروع رئيسي"}
                        </td>

                        {/* Unit info */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-neutral-900">{u?.type} — {u?.area} م²</p>
                          <p className="text-xs text-neutral-500">
                            الدور {u?.floor ?? 1} {u?.building ? `| مبنى ${u.building}` : ""}
                          </p>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-extrabold text-neutral-900 font-mono">
                          {u?.price ? `${Number(u.price).toLocaleString()} ج.م.` : "غير محدد"}
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${stageConfig.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${stageConfig.dot}`} />
                            {r.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-xs font-semibold text-neutral-500 font-mono">
                          {new Date(r.createdAt).toLocaleDateString("ar-EG")}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Update Stage */}
                            <button
                              onClick={() => {
                                setEditItem(r);
                                setNewStatus(r.status);
                                setNote(r.agentNotes || "");
                              }}
                              title="تحديث مرحلة الحجز والملاحظات"
                              className="h-9 px-3 rounded-xl bg-[#000e1f] text-white hover:bg-[#c9952a] hover:text-[#000e1f] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit_note</span>
                              <span>تحديث</span>
                            </button>

                            {/* Cancel */}
                            {!isClosed && (
                              <button
                                onClick={() => {
                                  setCancelItem(r);
                                  setCancelReason("");
                                }}
                                title="إلغاء الحجز وتفريغ الوحدة للموقع"
                                className="h-9 px-3 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">cancel</span>
                                <span>إلغاء</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL: UPDATE STAGE ── */}
      {editItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setEditItem(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-neutral-100">
            <div className="h-2 pharaoh-gold-gradient" />
            
            <div className="p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c9952a]">edit_calendar</span>
                  <h3 className="text-lg font-black text-[#000e1f]">تحديث مرحلة الحجز</h3>
                </div>
                <button
                  onClick={() => setEditItem(null)}
                  className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    المرحلة الجديدة للحجز:
                  </label>
                  <div className="relative">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full h-12 pr-4 pl-10 rounded-xl border border-neutral-200 bg-neutral-50 text-sm font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    ملاحظات المستشار وسجل المحادثة:
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="مثال: تم التواصل هاتفياً وتحديد موعد لزيارة المشروع واستكمال الأوراق..."
                    rows={4}
                    className="w-full p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white resize-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditItem(null)}
                  className="flex-1 h-12 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  تراجع
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="flex-1 h-12 rounded-xl font-bold text-xs text-[#000e1f] disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer pharaoh-gold-gradient"
                >
                  {updating ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: CANCEL RESERVATION ── */}
      {cancelItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setCancelItem(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-neutral-100">
            <div className="h-2 bg-rose-600" />
            
            <div className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[26px]">warning</span>
              </div>
              
              <h3 className="text-lg font-black text-neutral-900 mb-1">
                إلغاء الحجز وإعادة الوحدة للسوق
              </h3>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                عند تأكيد الإلغاء، ستعود الوحدة فوراً إلى حالة "متاح" لتظهر لكافة زوار الموقع مجدداً، وسيتم تدوين السبب في سجل العمليات.
              </p>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700">
                  سبب الإلغاء (إلزامي)*:
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="مثال: بناءً على طلب العميل بسبب ظروف خاصة، أو عدم الجدية خلال المهلة القانونية..."
                  rows={4}
                  className="w-full p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-rose-500 focus:bg-white resize-none transition-all"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setCancelItem(null)}
                  className="flex-1 h-12 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling || !cancelReason.trim()}
                  className="flex-1 h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs disabled:opacity-50 flex items-center justify-center transition-colors shadow-md cursor-pointer"
                >
                  {cancelling ? "جارٍ الإلغاء..." : "تأكيد الإلغاء وتفريغ الوحدة"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: AGENT DIRECT BOOKING ── */}
      {showBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowBook(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-neutral-100">
            <div className="h-2 pharaoh-gold-gradient" />
            
            <div className="p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c9952a]">domain_add</span>
                  <h3 className="text-lg font-black text-[#000e1f]">تسجيل حجز مباشر باسم عميل</h3>
                </div>
                <button
                  onClick={() => setShowBook(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">معرف كود الوحدة (Unit ID)*</label>
                  <input
                    type="text"
                    placeholder="أدخل كود الوحدة من النظام"
                    value={bookForm.unitId}
                    onChange={(e) => setBookForm((p) => ({ ...p, unitId: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">الاسم الكامل للعميل*</label>
                  <input
                    type="text"
                    placeholder="مثال: أستاذ أحمد خليل"
                    value={bookForm.clientName}
                    onChange={(e) => setBookForm((p) => ({ ...p, clientName: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-neutral-700">رقم هاتف العميل (11 رقم)*</label>
                    <span className={`text-[11px] font-mono ${bookForm.clientPhone.length === 11 ? 'text-emerald-700 font-bold' : 'text-neutral-400'}`}>
                      {bookForm.clientPhone.length}/11
                    </span>
                  </div>
                  <input
                    type="tel"
                    maxLength={11}
                    dir="ltr"
                    placeholder="010XXXXXXXX"
                    value={bookForm.clientPhone}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setBookForm((p) => ({ ...p, clientPhone: clean }));
                    }}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-right text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">ملاحظات وشروط الاتفاق</label>
                  <textarea
                    placeholder="أي ملاحظات حول خطة السداد أو الموعد..."
                    value={bookForm.notes}
                    onChange={(e) => setBookForm((p) => ({ ...p, notes: e.target.value }))}
                    rows={3}
                    className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white resize-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBook(false)}
                  className="flex-1 h-12 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAgentBook}
                  disabled={booking}
                  className="flex-1 h-12 rounded-xl font-bold text-xs text-[#000e1f] disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer pharaoh-gold-gradient"
                >
                  {booking ? "جارٍ الحجز..." : "تأكيد الحجز باسم العميل"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
