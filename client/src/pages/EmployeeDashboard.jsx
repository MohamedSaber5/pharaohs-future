import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import reservationService from '@services/reservation.service.js';
import { useAuth }        from '@context/AuthContext.jsx';
import toast from 'react-hot-toast';

const STAGES = ["طلب حجز","قيد المراجعة","محجوز","جاهز للتعاقد","مكتمل","ملغي"];
const STAGE_COLORS = {
  "طلب حجز":       "bg-blue-100 text-blue-800",
  "قيد المراجعة":  "bg-amber-100 text-amber-800",
  "محجوز":          "bg-purple-100 text-purple-800",
  "جاهز للتعاقد": "bg-indigo-100 text-indigo-800",
  "مكتمل":         "bg-green-100 text-green-800",
  "ملغي":           "bg-red-100 text-red-800",
  "منتهي الصلاحية":"bg-neutral-100 text-neutral-600",
};

// Also add agent-book modal
export default function EmployeeDashboard() {
  const { user }    = useAuth();
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('الكل');
  const [editId,    setEditId]    = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [note,      setNote]      = useState('');
  const [updating,  setUpdating]  = useState(false);
  const [showBook,  setShowBook]  = useState(false);
  const [bookForm,  setBookForm]  = useState({ unitId:'', clientName:'', clientPhone:'', notes:'' });
  const [booking,   setBooking]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter !== 'الكل') params.status = filter;
      const res = await reservationService.getAll(params);
      const d = res?.data ?? res;
      setItems(d?.reservations ?? []);
    } catch { toast.error('تعذّر تحميل الحجوزات'); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const openEdit = (r) => { setEditId(r._id); setNewStatus(r.status); setNote(r.agentNotes||''); };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await reservationService.updateStatus(editId, { status: newStatus, agentNotes: note });
      toast.success('تم تحديث الحجز ✅');
      setEditId(null);
      load();
    } catch (err) { toast.error(err?.message || 'خطأ'); }
    finally { setUpdating(false); }
  };

  const handleAgentBook = async () => {
    if (!bookForm.unitId || !bookForm.clientName || !bookForm.clientPhone) {
      toast.error('يرجى ملء جميع الحقول'); return;
    }
    setBooking(true);
    try {
      await reservationService.agentBook(bookForm);
      toast.success('تم الحجز باسم العميل ✅');
      setShowBook(false);
      setBookForm({ unitId:'', clientName:'', clientPhone:'', notes:'' });
      load();
    } catch (err) { toast.error(err?.message || 'خطأ'); }
    finally { setBooking(false); }
  };

  const filtered = filter === 'الكل' ? items : items.filter(r => r.status === filter);

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-[13px] text-[#775a1a] font-semibold mb-1">لوحة الموظف</p>
            <h1 className="text-[28px] font-bold text-neutral-900">مرحباً {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-[14px] text-neutral-500 mt-0.5">الحجوزات المعينة لك: {items.length} حجز</p>
          </div>
          <button onClick={()=>setShowBook(true)}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[13px] hover:opacity-90 transition-all shadow-md"
            style={{background:'#000e1f'}}>
            <span className="material-symbols-outlined text-[18px]">add</span>حجز باسم عميل
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
          {[
            {label:"إجمالي",       value:items.length,                                  color:"text-neutral-900", bg:"bg-white"},
            {label:"طلب حجز",      value:items.filter(r=>r.status==="طلب حجز").length,  color:"text-blue-700",    bg:"bg-blue-50"},
            {label:"قيد المراجعة", value:items.filter(r=>r.status==="قيد المراجعة").length, color:"text-amber-700", bg:"bg-amber-50"},
            {label:"مكتمل",        value:items.filter(r=>r.status==="مكتمل").length,    color:"text-green-700",   bg:"bg-green-50"},
          ].map(s=>(
            <div key={s.label} className={`${s.bg} rounded-2xl border border-neutral-100 shadow-sm p-5`}>
              <p className={`text-[28px] font-bold leading-none mb-1 ${s.color}`}>{s.value}</p>
              <p className="text-[13px] text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {["الكل",...STAGES].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              className={`h-8 px-3.5 rounded-lg text-[12px] font-semibold transition-all ${filter===s?"text-white":"text-neutral-500 bg-white border border-neutral-200 hover:bg-neutral-50"}`}
              style={filter===s?{background:'#000e1f'}:{}}>
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 flex flex-col gap-3">{[1,2,3].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">bookmark</span>
              <h3 className="text-[18px] font-bold text-neutral-600">لا توجد حجوزات</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{background:'#f8f9fa',borderBottom:'1px solid #f1f3f4'}}>
                  <tr>{["العميل","التليفون","المشروع","الوحدة","السعر","الحالة","التاريخ","إجراءات"].map(h=>(
                    <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filtered.map(r=>(
                    <tr key={r._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-[14px] font-bold text-neutral-800">{r.user?.name||r.clientPhone||'—'}</p>
                        <p className="text-[11px] text-neutral-400">{r.user?.email}</p>
                        {r.bookedByAgent && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-semibold">حجز موظف</span>}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-neutral-600">{r.user?.phone||r.clientPhone||'—'}</td>
                      <td className="px-4 py-3 text-[13px] text-neutral-700">{r.project?.name||'—'}</td>
                      <td className="px-4 py-3 text-[13px]">{r.unit?.type} {r.unit?.area}م²</td>
                      <td className="px-4 py-3 text-[13px] font-bold">{r.unit?.price?Number(r.unit.price).toLocaleString():'—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${STAGE_COLORS[r.status]||""}`}>{r.status}</span>
                      </td>
                      <td className="px-4 py-3 text-[12px] text-neutral-500">{new Date(r.createdAt).toLocaleDateString('ar-EG')}</td>
                      <td className="px-4 py-3">
                        <button onClick={()=>openEdit(r)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.6)'}} onClick={e=>e.target===e.currentTarget&&setEditId(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-5">تحديث مرحلة الحجز</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">المرحلة الجديدة</label>
                <select value={newStatus} onChange={e=>setNewStatus(e.target.value)}
                  className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                  {STAGES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">ملاحظة للعميل</label>
                <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3}
                  className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a]" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setEditId(null)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold">إلغاء</button>
              <button onClick={handleUpdate} disabled={updating}
                className="flex-1 h-10 rounded-xl text-white text-[13px] font-bold disabled:opacity-60 flex items-center justify-center" style={{background:'#000e1f'}}>
                {updating?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />:"حفظ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Book Modal */}
      {showBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.6)'}} onClick={e=>e.target===e.currentTarget&&setShowBook(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-[18px] font-bold text-neutral-900 mb-5">حجز وحدة باسم عميل</h3>
            <div className="flex flex-col gap-4">
              {[
                {label:"كود الوحدة (ID)*", key:"unitId",      ph:"مثال: 6ad001cd..."},
                {label:"اسم العميل*",      key:"clientName",  ph:"محمد أحمد"},
                {label:"تليفون العميل*",   key:"clientPhone", ph:"01012345678"},
                {label:"ملاحظات",          key:"notes",       ph:"أي ملاحظات..."},
              ].map(f=>(
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">{f.label}</label>
                  <input value={bookForm[f.key]} onChange={e=>setBookForm(p=>({...p,[f.key]:e.target.value}))}
                    placeholder={f.ph} className="h-10 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a]" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setShowBook(false)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold">إلغاء</button>
              <button onClick={handleAgentBook} disabled={booking}
                className="flex-1 h-10 rounded-xl text-white text-[13px] font-bold disabled:opacity-60 flex items-center justify-center" style={{background:'#000e1f'}}>
                {booking?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />:"تأكيد الحجز"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}