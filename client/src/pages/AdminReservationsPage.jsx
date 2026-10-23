import { useState, useEffect, useCallback } from 'react';
import reservationService from '@services/reservation.service.js';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useLanguage } from '@context/LanguageContext.jsx';

const STAGES = ["طلب حجز","قيد المراجعة","محجوز","جاهز للتعاقد","مكتمل","ملغي","منتهي الصلاحية"];
const STATUS_COLORS = {
  "طلب حجز":        "bg-blue-100 text-blue-800",
  "قيد المراجعة":   "bg-amber-100 text-amber-800",
  "محجوز":           "bg-purple-100 text-purple-800",
  "جاهز للتعاقد":  "bg-indigo-100 text-indigo-800",
  "مكتمل":          "bg-green-100 text-green-800",
  "ملغي":            "bg-red-100 text-red-800",
  "منتهي الصلاحية": "bg-neutral-100 text-neutral-500",
};

export default function AdminReservationsPage() {
  const { t, isRTL, dir, tStatus, tType, formatPrice } = useLanguage();
  const [items,     setItems]     = useState([]);
  const [stats,     setStats]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('الكل');
  const [page,      setPage]      = useState(1);
  const [total,     setTotal]     = useState(0);
  const [editId,    setEditId]    = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [updating,  setUpdating]  = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (filter !== 'الكل') params.status = filter;
      const [res, sRes] = await Promise.all([
        reservationService.getAll(params),
        reservationService.getStats(),
      ]);
      const d = res?.data ?? res;
      setItems(d?.reservations ?? []);
      setTotal(d?.total ?? 0);
      setStats(sRes?.data ?? sRes);
    } catch { toast.error('تعذّر تحميل البيانات'); }
    finally { setLoading(false); }
  }, [filter, page]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (r) => {
    setEditId(r._id);
    setNewStatus(r.status);
    setAdminNote(r.agentNotes || '');
  };

  const handleUpdate = async () => {
    if (!STAGES.includes(newStatus)) { toast.error('اختر مرحلة صحيحة'); return; }
    setUpdating(true);
    try {
      await reservationService.updateStatus(editId, { status: newStatus, agentNotes: adminNote });
      toast.success('تم التحديث ✅');
      setEditId(null);
      load();
    } catch (err) { toast.error(err?.message || 'خطأ'); }
    finally { setUpdating(false); }
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.setFont('helvetica');
    doc.text('Reservations Report — Pharaohs Future', 14, 14);
    doc.text(new Date().toLocaleDateString('ar-EG'), 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['#','Client','Phone','Project','Unit','Price','Status','Date']],
      body: items.map((r,i) => [
        i+1, r.user?.name||'—', r.user?.phone||'—',
        r.project?.name||'—', `${r.unit?.type||''} ${r.unit?.area||''}m`,
        r.unit?.price ? Number(r.unit.price).toLocaleString()+' EGP' : '—',
        r.status, new Date(r.createdAt).toLocaleDateString('ar-EG'),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0,14,31] },
    });
    doc.save('reservations-report.pdf');
  };

  const s = stats?.summary ?? {};

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6" style={{ background: '#f8f9fa', minHeight: '100vh' }} dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">{t("admin.menuReservations", "إدارة الحجوزات")}</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">
            {isRTL ? `إجمالي: ${total} حجز` : `Total: ${total} Bookings`}
          </p>
        </div>
        <button onClick={exportPDF}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[13px] hover:opacity-90 transition-all shadow-md cursor-pointer"
          style={{ background: '#000e1f' }}>
          <span className="material-symbols-outlined text-[18px]">download</span>
          {isRTL ? "تصدير PDF" : "Export PDF"}
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: isRTL ? "الإجمالي" : "Total", v: s.total || 0, bg: "bg-white" },
            { label: tStatus("طلب حجز"), v: s["طلب حجز"] || 0, bg: "bg-blue-50" },
            { label: tStatus("قيد المراجعة"), v: s["قيد المراجعة"] || 0, bg: "bg-amber-50" },
            { label: tStatus("محجوز"), v: s["محجوز"] || 0, bg: "bg-purple-50" },
            { label: tStatus("جاهز للتعاقد"), v: s["جاهز للتعاقد"] || 0, bg: "bg-indigo-50" },
            { label: tStatus("مكتمل"), v: s["مكتمل"] || 0, bg: "bg-green-50" },
            { label: tStatus("ملغي"), v: (s["ملغي"] || 0) + (s["منتهي الصلاحية"] || 0), bg: "bg-red-50" },
          ].map(c => (
            <div key={c.label} className={`${c.bg} rounded-2xl border border-neutral-100 shadow-sm p-4`}>
              <p className="text-[24px] font-bold text-neutral-900 leading-none">{c.v}</p>
              <p className="text-[11px] text-neutral-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex items-center gap-2 flex-wrap">
        {["الكل", ...STAGES].map(st => (
          <button key={st} onClick={() => { setFilter(st); setPage(1); }}
            className={`h-9 px-3.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${filter === st ? "text-white shadow-sm" : "text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
            style={filter === st ? { background: '#000e1f' } : {}}>
            {st === "الكل" ? t("common.all", "الكل") : tStatus(st)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">bookmark</span>
            <h3 className="text-[18px] font-bold text-neutral-600 mb-1">{isRTL ? "لا توجد حجوزات" : "No reservations found"}</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #f1f3f4' }}>
                  {[
                    "#",
                    t("employee.clientCol", "العميل"),
                    t("employee.phoneCol", "التليفون"),
                    t("admin.projectCol", "المشروع"),
                    t("employee.unitCol", "الوحدة"),
                    isRTL ? "الدور" : "Floor",
                    t("employee.priceCol", "السعر"),
                    t("admin.statusCol", "الحالة"),
                    t("common.date", "التاريخ"),
                    t("common.actions", "إجراءات")
                  ].map(h => (
                    <th key={h} className={`px-4 py-3.5 ${isRTL ? "text-right" : "text-left"} text-[12px] font-semibold text-neutral-500 whitespace-nowrap`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((r, i) => (
                  <tr key={r._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className={`px-4 py-3 text-[12px] text-neutral-400 font-mono ${isRTL ? "text-right" : "text-left"}`}>{(page - 1) * 15 + i + 1}</td>
                    <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">{r.user?.name || r.clientPhone || '—'}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">{r.user?.email}</p>
                    </td>
                    <td className={`px-4 py-3 text-[13px] text-neutral-600 whitespace-nowrap font-mono ${isRTL ? "text-right" : "text-left"}`} dir="ltr">{r.user?.phone || r.clientPhone || '—'}</td>
                    <td className={`px-4 py-3 text-[13px] text-neutral-700 whitespace-nowrap ${isRTL ? "text-right" : "text-left"}`}>{!isRTL && r.project?.nameEn ? r.project.nameEn : (r.project?.name || '—')}</td>
                    <td className={`px-4 py-3 text-[13px] text-neutral-700 whitespace-nowrap ${isRTL ? "text-right" : "text-left"}`}>{tType(r.unit?.type)} {r.unit?.area ? `${r.unit.area} ${isRTL ? 'م²' : 'sqm'}` : ''}</td>
                    <td className={`px-4 py-3 text-[13px] text-neutral-600 ${isRTL ? "text-right" : "text-left"}`}>{isRTL ? "الدور " : "Floor "}{r.unit?.floor || 1}</td>
                    <td className={`px-4 py-3 whitespace-nowrap font-mono ${isRTL ? "text-right" : "text-left"}`}>
                      <span className="text-[13px] font-bold text-neutral-800">{r.unit?.price ? formatPrice(r.unit.price) : '—'}</span>
                    </td>
                    <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${STATUS_COLORS[r.status] || ""}`}>{tStatus(r.status)}</span>
                    </td>
                    <td className={`px-4 py-3 text-[12px] text-neutral-500 whitespace-nowrap font-mono ${isRTL ? "text-right" : "text-left"}`}>
                      {new Date(r.createdAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => openEdit(r)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all cursor-pointer" title={isRTL ? "تعديل" : "Edit"}>
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {total > 15 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <p className="text-[13px] text-neutral-500">
              {isRTL ? `صفحة ${page} من ${Math.ceil(total / 15)}` : `Page ${page} of ${Math.ceil(total / 15)}`}
            </p>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-neutral-600 text-[13px] font-semibold disabled:opacity-40 hover:bg-neutral-200 transition-all cursor-pointer">
                {isRTL ? "السابق" : "Previous"}
              </button>
              <button disabled={page >= Math.ceil(total / 15)} onClick={() => setPage(p => p + 1)} className="h-9 px-4 rounded-lg bg-neutral-100 text-neutral-600 text-[13px] font-semibold disabled:opacity-40 hover:bg-neutral-200 transition-all cursor-pointer">
                {isRTL ? "التالي" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Status Modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,14,31,0.6)' }} onClick={e => e.target === e.currentTarget && setEditId(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-5">{isRTL ? "تحديث مرحلة الحجز" : "Update Booking Stage"}</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">{isRTL ? "المرحلة الجديدة" : "New Stage"}</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                  className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                  {STAGES.map(st => <option key={st} value={st}>{tStatus(st)}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">{isRTL ? "ملاحظة للعميل" : "Client Note"}</label>
                <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={3}
                  placeholder={isRTL ? "مثال: سيتم التواصل معك على 01000000000" : "e.g., We will contact you at 01000000000"}
                  className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a] transition-all" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditId(null)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all cursor-pointer">
                {t("common.cancel", "إلغاء")}
              </button>
              <button onClick={handleUpdate} disabled={!!updating}
                className="flex-1 h-10 rounded-xl text-white text-[13px] font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                style={{ background: '#000e1f' }}>
                {updating ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span className="material-symbols-outlined text-[18px]">save</span>{t("common.save", "حفظ")}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}