import { useState, useEffect, useCallback } from "react";
import reservationService from "@services/reservation.service.js";
import { useAuth } from "@context/AuthContext.jsx";

const STAGES = ["طلب حجز", "قيد المراجعة", "محجوز", "جاهز للتعاقد", "مكتمل", "ملغي"];

const STAGE_COLORS = {
  "طلب حجز":       "bg-blue-100 text-blue-800 border border-blue-200",
  "قيد المراجعة":  "bg-amber-100 text-amber-800 border border-amber-200",
  "محجوز":         "bg-purple-100 text-purple-800 border border-purple-200",
  "جاهز للتعاقد":  "bg-indigo-100 text-indigo-800 border border-indigo-200",
  "مكتمل":         "bg-green-100 text-green-800 border border-green-200",
  "ملغي":          "bg-red-100 text-red-800 border border-red-200",
  "منتهي الصلاحية": "bg-gray-100 text-gray-700 border border-gray-200",
};

export default function EmployeeDashboard() {
  const { user } = useAuth();

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

  // Dedicated Cancel Modal (User Story: إلغاء حجز وتسجيل السبب لإعادة الوحدة للسوق)
  const [cancelItem, setCancelItem]   = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling]   = useState(false);

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
      setAlertMsg({ type: "error", text: "تعذّر تحميل قائمة الحجوزات" });
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
      setAlertMsg({ type: "success", text: `تم تحديث حالة الحجز إلى "${newStatus}" بنجاح` });
      setEditItem(null);
      loadAssigned();
    } catch (e) {
      setAlertMsg({ type: "error", text: e.response?.data?.message || "فشل التحديث" });
    } finally {
      setUpdating(false);
    }
  };

  // Handle Cancellation with mandatory reason (AC: إلغاء حجز وتسجيل السبب وتفريغ الوحدة)
  const handleCancel = async () => {
    if (!cancelItem) return;
    if (!cancelReason.trim()) {
      setAlertMsg({ type: "error", text: "يرجى كتابة سبب الإلغاء بدقة لتسجيله في السجل وإعادة الوحدة للسوق" });
      return;
    }
    setCancelling(true);
    try {
      await reservationService.cancel(cancelItem._id, cancelReason);
      setAlertMsg({
        type: "success",
        text: "تم إلغاء الحجز بنجاح، وسُجل السبب وتمت إعادة الوحدة فوراً لقائمة الوحدات المتاحة",
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
      setAlertMsg({ type: "success", text: "تم تسجيل الحجز بنجاح باسم العميل" });
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
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#000e1f] text-white pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#c9952a]">support_agent</span>
              <span className="text-[13px] font-semibold text-[#c9952a]">بوابة المبيعات والمستشار العقاري</span>
            </div>
            <h1 className="text-[28px] md:text-[36px] font-bold">حجوزات العملاء المخصصة لك</h1>
            <p className="text-white/60 text-[14px] mt-1">
              مرحباً {user?.name || "المستشار"}، قم بإدارة طلبات الحجز، وتحديث المراحل، أو إلغاء الحجوزات مع تدوين السبب.
            </p>
          </div>

          <button
            onClick={() => setShowBook(true)}
            className="h-11 px-5 rounded-xl font-bold text-white text-[13px] flex items-center gap-2 shadow-lg hover:opacity-90 transition-all self-start md:self-auto"
            style={{ background: "#775a1a" }}
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            حجز وحدة لعميل
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {alertMsg.text && (
          <div
            className={`p-4 rounded-2xl text-[14px] font-semibold mb-6 flex items-center justify-between shadow-sm ${
              alertMsg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">
                {alertMsg.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{alertMsg.text}</span>
            </div>
            <button onClick={() => setAlertMsg({ type: "", text: "" })}>
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Workload Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "طلبات جديدة", val: counts.pending, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "قيد المراجعة", val: counts.review, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "وحدات محجوزة", val: counts.reserved, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "تم التعاقد", val: counts.completed, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-neutral-500">{s.label}</span>
                <span className={`w-8 h-8 rounded-xl ${s.bg} ${s.color} flex items-center justify-center font-bold text-[14px]`}>
                  {s.val}
                </span>
              </div>
              <p className={`text-[28px] font-black mt-2 ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {["الكل", ...STAGES].map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setPage(1); }}
              className={`h-9 px-4 rounded-xl text-[13px] font-bold transition-all ${
                filter === s
                  ? "text-white shadow-sm"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              }`}
              style={filter === s ? { background: "#000e1f" } : {}}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-neutral-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="p-16 text-center">
              <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-2">assignment_late</span>
              <h3 className="text-[18px] font-bold text-neutral-700">لا توجد حجوزات في هذا التصنيف</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 text-[12px] font-bold">
                  <tr>
                    <th className="px-5 py-4">العميل</th>
                    <th className="px-5 py-4">الهاتف</th>
                    <th className="px-5 py-4">المشروع</th>
                    <th className="px-5 py-4">الوحدة</th>
                    <th className="px-5 py-4">السعر</th>
                    <th className="px-5 py-4">الحالة</th>
                    <th className="px-5 py-4">تاريخ الحجز</th>
                    <th className="px-5 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-[13px]">
                  {items.map((r) => {
                    const u = r.unit;
                    const isClosed = r.status === "ملغي" || r.status === "مكتمل" || r.status === "منتهي الصلاحية";
                    return (
                      <tr key={r._id} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-neutral-900">{r.user?.name || r.clientPhone || "—"}</p>
                          <p className="text-[11px] text-neutral-400">{r.user?.email}</p>
                          {r.bookedByAgent && (
                            <span className="inline-block text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md font-bold mt-1">
                              حجز موظف
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 font-mono font-medium text-neutral-700">
                          {r.user?.phone || r.clientPhone || "—"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-neutral-800">
                          {r.project?.name || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-neutral-800">{u?.type} — {u?.area} م²</p>
                          <p className="text-[11px] text-neutral-400">الدور {u?.floor} {u?.building ? `| ${u.building}` : ""}</p>
                        </td>
                        <td className="px-5 py-4 font-bold text-neutral-900">
                          {u?.price ? `${Number(u.price).toLocaleString()} ج.م` : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${STAGE_COLORS[r.status] || ""}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-neutral-500 text-[12px]">
                          {new Date(r.createdAt).toLocaleDateString("ar-EG")}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Update Stage Button */}
                            <button
                              onClick={() => {
                                setEditItem(r);
                                setNewStatus(r.status);
                                setNote(r.agentNotes || "");
                              }}
                              title="تحديث المرحلة وإضافة ملاحظة"
                              className="h-8 px-3 rounded-lg bg-neutral-100 hover:bg-[#000e1f] hover:text-white text-neutral-700 text-[12px] font-bold flex items-center gap-1 transition-all"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit_note</span>
                              مرحلة
                            </button>

                            {/* Cancel Button with reason logging (User Story) */}
                            {!isClosed && (
                              <button
                                onClick={() => {
                                  setCancelItem(r);
                                  setCancelReason("");
                                }}
                                title="إلغاء الحجز وتفريغ الوحدة للموقع"
                                className="h-8 px-3 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 text-[12px] font-bold flex items-center gap-1 transition-all"
                              >
                                <span className="material-symbols-outlined text-[16px]">cancel</span>
                                إلغاء
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

      {/* Modal: Update Status */}
      {editItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => e.target === e.currentTarget && setEditItem(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
              <h3 className="text-[18px] font-bold text-neutral-900">تحديث مرحلة الحجز</h3>
              <button onClick={() => setEditItem(null)}>
                <span className="material-symbols-outlined text-neutral-400">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                  المرحلة الجديدة:
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[14px] font-semibold text-neutral-800 outline-none focus:border-[#775a1a]"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                  ملاحظة للعميل وفريق المبيعات:
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="مثال: تم الاتصال بالعميل وتحديد موعد التعاقد يوم الخميس..."
                  rows={4}
                  className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-[#775a1a] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditItem(null)}
                className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-bold text-[13px]"
              >
                تراجع
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="flex-1 h-11 rounded-xl text-white font-bold text-[13px] disabled:opacity-50 flex items-center justify-center"
                style={{ background: "#000e1f" }}
              >
                {updating ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cancel Reservation with Reason (User Story) */}
      {cancelItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => e.target === e.currentTarget && setCancelItem(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <h3 className="text-[19px] font-bold text-neutral-900 mb-1">
              إلغاء الحجز وإعادة الوحدة للسوق
            </h3>
            <p className="text-[13px] text-neutral-500 mb-4 leading-relaxed">
              عند تأكيد الإلغاء، ستعود الوحدة فوراً إلى حالة "متاح" لتظهر لكافة زوار الموقع، وسيتم إرسال إشعار للعميل بالسبب المسجل أدناه.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-neutral-700">
                سبب الإلغاء (إلزامي)*:
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="مثال: طلب العميل إلغاء الحجز لظروف خاصة، أو تعذر التواصل معه خلال مهلة الأسبوع..."
                rows={4}
                className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCancelItem(null)}
                className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-bold text-[13px]"
              >
                إغلاق
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling || !cancelReason.trim()}
                className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[13px] disabled:opacity-50 flex items-center justify-center"
              >
                {cancelling ? "جاري الإلغاء..." : "تأكيد الإلغاء وإتاحة الوحدة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Book for Client */}
      {showBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => e.target === e.currentTarget && setShowBook(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-4">تسجيل حجز مباشر لعميل</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1">كود الوحدة (Unit ID)*</label>
                <input
                  type="text"
                  placeholder="معرف الوحدة في النظام"
                  value={bookForm.unitId}
                  onChange={(e) => setBookForm((p) => ({ ...p, unitId: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-[#775a1a]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1">اسم العميل*</label>
                <input
                  type="text"
                  placeholder="الاسم ثلاثي"
                  value={bookForm.clientName}
                  onChange={(e) => setBookForm((p) => ({ ...p, clientName: e.target.value }))}
                  className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-[#775a1a]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[13px] font-bold text-neutral-700">رقم الهاتف (مصر)*</label>
                  <span className={`text-[11px] font-mono ${bookForm.clientPhone.length === 11 ? 'text-green-600 font-bold' : 'text-neutral-400'}`}>
                    {bookForm.clientPhone.length}/11
                  </span>
                </div>
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="01012345678"
                  value={bookForm.clientPhone}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 11);
                    setBookForm((p) => ({ ...p, clientPhone: clean }));
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-[#775a1a]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1">ملاحظات الحجز</label>
                <textarea
                  placeholder="أي تفاصيل إضافية..."
                  value={bookForm.notes}
                  onChange={(e) => setBookForm((p) => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] outline-none focus:border-[#775a1a] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBook(false)}
                className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-bold text-[13px]"
              >
                إلغاء
              </button>
              <button
                onClick={handleAgentBook}
                disabled={booking}
                className="flex-1 h-11 rounded-xl text-white font-bold text-[13px] disabled:opacity-50 flex items-center justify-center"
                style={{ background: "#775a1a" }}
              >
                {booking ? "جاري الحجز..." : "تأكيد الحجز"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
